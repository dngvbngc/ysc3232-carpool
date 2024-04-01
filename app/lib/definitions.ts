export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// export type GeoLocation = {
//   lat: number;
//   lng: number;
// };

export type Post = {
  id: string;
  author_id: string;
  start_location: string;
  end_location: string;
  ride_time: string;
  post_time: string;
  ride_service: 'Grab' | 'Gojek' | 'Ryde' | 'ComfortDelGro' | 'TADA';
  description: string;
  carpoolers: number;
  status: 'open' | 'closed';
};

export type LastestPost = {
  id: string;
  author_id: string;
  start_location: string;
  end_location: string;
  // start_location: GeoLocation;
  // end_location: GeoLocation;
  ride_time: string;
  post_time: string;
  ride_service: 'Grab' | 'Gojek' | 'Ryde' | 'ComfortDelGro' | 'TADA';
  description: string;
  carpoolers: number;
  status: 'open' | 'closed';
};

export type CurrentPost = {
  id: string;
  author_id: string;
  name: string;
  email: string;
  start_location: string;
  end_location: string;
  // start_location: GeoLocation;
  // end_location: GeoLocation;
  ride_time: string;
  post_time: string;
  ride_service: 'Grab' | 'Gojek' | 'Ryde' | 'ComfortDelGro' | 'TADA';
  description: string;
  carpoolers: number;
  status: 'open' | 'closed';
};

export type PostsTable = {
  id: string;
  author_id: string;
  name: string;
  email: string;
  start_location: string;
  end_location: string;
  // start_location: GeoLocation;
  // end_location: GeoLocation;
  ride_time: string;
  post_time: string;
  ride_service: 'Grab' | 'Gojek' | 'Ryde' | 'ComfortDelGro' | 'TADA';
  description: string;
  carpoolers: number;
  status: 'open' | 'closed';
};

export type Comment = {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  comment_time: string;
};

export type PostForm = {
  id: string;
  author_id: string;
  start_location: string;
  end_location: string;
  // start_location: GeoLocation;
  // end_location: GeoLocation;
  ride_time: string;
  post_time: string;
  ride_service: 'Grab' | 'Gojek' | 'Ryde' | 'ComfortDelGro' | 'TADA';
  description: string;
  carpoolers: number;
  status: 'open' | 'closed';
};

export type UserField = {
  id: string;
  name: string;
};

export type UsersTable = {
  id: string;
  name: string;
  email: string;
  total_posts: number;
  total_open: number;
  total_closed: number;
};

export type FormattedUsersTable = {
  id: string;
  name: string;
  email: string;
  total_posts: number;
  total_open: number;
  total_closed: number;
};
