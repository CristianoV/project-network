import { User } from '../IData/IFriendData';

export interface IFriendshipService {
  getFriends(authorization: string): Promise<User[]>;
  getFriendsByUserId(id: number): Promise<User[]>;
  addFriend(authorization: string, friendId: number): Promise<string>;
  deleteFriend(authorization: string, friendId: number): Promise<string>;
}
