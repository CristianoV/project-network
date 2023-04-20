export interface IGroupsService<T> {
  getGroupsByUserId(id: number): Promise<T | null>;
  createGroup(
    name: string,
    description: string,
    authorization: string
  ): Promise<T>;
  deleteGroup(id: number): Promise<number>;
}
