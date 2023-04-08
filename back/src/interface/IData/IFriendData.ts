interface Friend {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  profile_picture: string | null;
}

export interface User {
  id: number;
  friend: Friend;
}