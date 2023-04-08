import { User } from '../IData/IFriendData';

export interface IFriendshipService {
  getFriends(authorization: string): Promise<User[]>;
}
