const { db } = require('@vercel/postgres');
const {
  users,
  posts,
  comments,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedPosts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "posts" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      author_id UUID NOT NULL,
      carpoolers INT NOT NULL,
      status TEXT NOT NULL,
      ride_service TEXT NOT NULL,
      ride_time TIMESTAMP NOT NULL,
      post_time TIMESTAMP NOT NULL,
      description TEXT,
      start_location TEXT NOT NULL,
      end_location TEXT NOT NULL
    );
    `;

    console.log(`Created "posts" table`);

    // Insert data into the "posts" table
    const insertedPosts = await Promise.all(
      posts.map(
        (post) => client.sql`
        INSERT INTO posts (
          author_id,
          start_location,
          end_location,
          ride_time,
          post_time,
          ride_service,
          description,
          carpoolers,
          status)
        VALUES (
          ${post.author_id}, 
          ${post.start_location}, 
          ${post.end_location}, 
          ${post.ride_time},
          ${post.post_time},
          ${post.ride_service},   
          ${post.description},
          ${post.carpoolers},
          ${post.status})
        ON CONFLICT (id) DO NOTHING;
      `
      ),
    );

    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
      createTable,
      posts: insertedPosts,
    };
  } catch (error) {
    console.error('Error seeding posts:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedPosts(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
