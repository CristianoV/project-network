export default interface IUserService<T> {
  getUser(authorization: string): Promise<T>;
}
