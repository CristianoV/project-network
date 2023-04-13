export default interface ISearchService<T> {
  getUserAndComunitiesByName(name: string): Promise<T[]>;
  getUsersByName(name: string, phrase: string): Promise<T[]>;
  getUsersByName(name: string, profile: any): Promise<T[]>;
}
