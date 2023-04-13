export default interface IUserService<T> {
  getUser(authorization: string): Promise<T>;
  updatePhrase(authorization: string, phrase: string): Promise<string>;
  updateProfile(authorization: string, profile: any): Promise<string>;
}
