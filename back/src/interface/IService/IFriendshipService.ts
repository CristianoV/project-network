import { User } from '../IData/IFriendData';

interface Friend {
  id: number;
  friend: User;
}

export interface IFriendshipService {
  getFriends(authorization: string): Promise<User[]>;
  getFriendsByUserId(id: number): Promise<User[]>;
  addFriend(authorization: string, friendId: number): Promise<string>;
  deleteFriend(authorization: string, friendId: number): Promise<string>;
  getFriendRequestsByUserId(authorization: string): Promise<Friend[]>;
  respondToFriendRequest(
    authorization: string,
    friendId: number,
    status: string
  ): Promise<string>;
  isFriend(
    authorization: string,
    friendId: number
  ): Promise<Record<string, string>>;
}
