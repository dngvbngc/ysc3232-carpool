import { sql } from '@vercel/postgres';
import {
  User,
  Post,
  Comment,
  LastestPost,
  PostsTable,
  PostForm,
  UserField,
  UsersTable,
  CurrentPost
} from './definitions';
import { geocodeAddress } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
const DELTA_LAT_KM = 0.05; 
const DELTA_LON_KM = 0.05;

export async function fetchLatestPosts() {
  noStore();
  try {
    const data = await sql<LastestPost>`
      SELECT 
        posts.id,
        users.name, 
        split_part(substr(trim(start_location::text, '()'), 1), ',', 1)::float AS start_latitude,
        split_part(substr(trim(start_location::text, '()'), 1), ',', 2)::float AS start_longitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 1)::float AS end_latitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 2)::float AS end_longitude,
        posts.ride_time, 
        posts.ride_service, 
        posts.carpoolers, 
        posts.status
      FROM posts
      JOIN users ON posts.author_id = users.id
      ORDER BY posts.post_time DESC
      LIMIT 5`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest posts.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    const userCountPromise = sql`SELECT COUNT(*) FROM users`;
    const postCountPromise = sql`SELECT COUNT(*) FROM posts`;
    const postStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'open' THEN 1 ELSE 0 END) AS open,
         SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) AS closed
         FROM posts`;

    const data = await Promise.all([
      userCountPromise,
      postCountPromise,
      postStatusPromise,
    ]);

    const numberOfUsers = Number(data[0].rows[0].count ?? 0);
    const numberOfPosts = Number(data[1].rows[0].count ?? 0);
    const totalOpenPosts = Number(data[2].rows[0].open ?? 0);
    const totalClosedPosts = Number(data[2].rows[0].closed ?? 0);

    return {
      numberOfUsers,
      numberOfPosts,
      totalOpenPosts,
      totalClosedPosts,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredPosts(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Convert query to geolocation
  const searchLocation = await geocodeAddress(query);
  let postsQuery;

  if (searchLocation) {
    // If geolocation is found, use the filtered query
    postsQuery = sql<PostsTable>`
      SELECT
        posts.id,
        users.name, 
        split_part(substr(trim(start_location::text, '()'), 1), ',', 1)::float AS start_latitude,
        split_part(substr(trim(start_location::text, '()'), 1), ',', 2)::float AS start_longitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 1)::float AS end_latitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 2)::float AS end_longitude,
        posts.ride_time, 
        posts.ride_service, 
        posts.carpoolers, 
        posts.status
      FROM posts
      JOIN users ON posts.author_id = users.id
      WHERE (
        (split_part(substr(trim(start_location::text, '()'), 1), ',', 1)::float BETWEEN ${searchLocation.latitude - DELTA_LAT_KM} AND ${searchLocation.latitude + DELTA_LAT_KM}) AND
        (split_part(substr(trim(start_location::text, '()'), 1), ',', 2)::float BETWEEN ${searchLocation.longitude - DELTA_LON_KM} AND ${searchLocation.longitude + DELTA_LON_KM})
      ) OR (
        (split_part(substr(trim(end_location::text, '()'), 1), ',', 1)::float BETWEEN ${searchLocation.latitude - DELTA_LAT_KM} AND ${searchLocation.latitude + DELTA_LAT_KM}) AND
        (split_part(substr(trim(end_location::text, '()'), 1), ',', 2)::float BETWEEN ${searchLocation.longitude - DELTA_LON_KM} AND ${searchLocation.longitude + DELTA_LON_KM})
      ) OR (
        users.name ILIKE ${`%${query}%`}
      )
      ORDER BY posts.post_time DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
  } else {
    // If geolocation is not found, return all posts
    postsQuery = sql<PostsTable>`
      SELECT
        posts.id,
        users.name, 
        split_part(substr(trim(start_location::text, '()'), 1), ',', 1)::float AS start_latitude,
        split_part(substr(trim(start_location::text, '()'), 1), ',', 2)::float AS start_longitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 1)::float AS end_latitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 2)::float AS end_longitude,
        posts.ride_time, 
        posts.ride_service, 
        posts.carpoolers, 
        posts.status
      FROM posts
      JOIN users ON posts.author_id = users.id
      WHERE users.name ILIKE ${`%${query}%`}
      ORDER BY posts.post_time DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
  }

  try {
    const posts = await postsQuery;
    return posts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }
}

export async function fetchPostsPages(query: string) {
  noStore();
  let countQuery;

  const searchLocation = await geocodeAddress(query);
  if (searchLocation) {
    // If geolocation is found, use the filtered count query
    countQuery = sql`
      SELECT COUNT(*)
      FROM posts
      JOIN users ON posts.author_id = users.id
      WHERE (
        (split_part(substr(trim(start_location::text, '()'), 1), ',', 1)::float BETWEEN ${searchLocation.latitude - DELTA_LAT_KM} AND ${searchLocation.latitude + DELTA_LAT_KM}) AND
        (split_part(substr(trim(start_location::text, '()'), 1), ',', 2)::float BETWEEN ${searchLocation.longitude - DELTA_LON_KM} AND ${searchLocation.longitude + DELTA_LON_KM})
      ) OR (
        (split_part(substr(trim(end_location::text, '()'), 1), ',', 1)::float BETWEEN ${searchLocation.latitude - DELTA_LAT_KM} AND ${searchLocation.latitude + DELTA_LAT_KM}) AND
        (split_part(substr(trim(end_location::text, '()'), 1), ',', 2)::float BETWEEN ${searchLocation.longitude - DELTA_LON_KM} AND ${searchLocation.longitude + DELTA_LON_KM})
      )
    `;
  } else {
    // If geolocation is not found, return count of all posts
    countQuery = sql`SELECT COUNT(*) FROM posts`;
  }

  try {
    const countResult = await countQuery;
    const totalPages = Math.ceil(Number(countResult.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of posts.');
  }
}


export async function fetchPostById(id: string) {
  noStore();
  try {
    const data = await sql<PostForm>`
      SELECT
        posts.id,
        posts.author_id,
        split_part(substr(trim(start_location::text, '()'), 1), ',', 1)::float AS start_latitude,
        split_part(substr(trim(start_location::text, '()'), 1), ',', 2)::float AS start_longitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 1)::float AS end_latitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 2)::float AS end_longitude,
        posts.ride_time,
        posts.post_time,
        posts.ride_service,
        posts.description,
        posts.carpoolers,
        posts.status
      FROM posts
      WHERE posts.id = ${id};
    `;

    const post = data.rows.map((post) => ({
      ...post
    }));

    return post[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchCurrentPost(id: string) {
  noStore();
  try {
    const data = await sql<CurrentPost>`
      SELECT 
        posts.id,
        posts.author_id,
        users.name, 
        users.email,
        split_part(substr(trim(start_location::text, '()'), 1), ',', 1)::float AS start_latitude,
        split_part(substr(trim(start_location::text, '()'), 1), ',', 2)::float AS start_longitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 1)::float AS end_latitude,
        split_part(substr(trim(end_location::text, '()'), 1), ',', 2)::float AS end_longitude,
        posts.ride_time, 
        posts.post_time,
        posts.description,
        posts.ride_service, 
        posts.carpoolers, 
        posts.status
      FROM posts
      JOIN users ON posts.author_id = users.id
      WHERE posts.id = ${id};
    `;

    const post = data.rows.map((post) => ({
      ...post
    }));

    return post[0];
  } catch (error) {
    console.error('Database Error:', error);
  }
}

export async function fetchUsers() {
  noStore();
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFilteredUsers(query: string) {
  noStore();
  try {
    const data = await sql<UsersTable>`
		SELECT
		  users.id,
		  users.name,
		  users.email,
		  COUNT(posts.id) AS total_posts,
		  COUNT(CASE WHEN posts.status = 'open') AS total_open,
		  COUNNT(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_closed
		FROM users
		LEFT JOIN posts ON users.id = posts.author_id
		WHERE
		  users.name ILIKE ${`%${query}%`} OR
        users.email ILIKE ${`%${query}%`}
		GROUP BY users.id, users.name, users.email
		ORDER BY users.name ASC
	  `;

    const users = data.rows.map((user) => ({
      ...user,
    }));

    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch user table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchCommentsByPostId(postId: string) {
  noStore();
  try {
    const comments = await sql<Comment[]>`
      SELECT
        comments.id,
        comments.post_id,
        comments.author_id,
        users.name as author_name, // Join with users to get the name of the comment author
        comments.content,
        comments.comment_time
      FROM comments
      JOIN users ON comments.author_id = users.id
      WHERE comments.post_id = ${postId}
      ORDER BY comments.comment_time ASC`; // You might want to adjust the ordering

    return comments.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comments.');
  }
}
