export interface IGroupsService<T> {
  getGroupsByUserId(id: number): Promise<T | null>;
  createGroup({
    name,
    description,
    authorization,
    language,
    category,
    type,
    country,
    profile_picture,
  }: {
    name: string;
    description: string;
    authorization: string;
    language: string;
    category: string;
    type: string;
    country: string;
    profile_picture: string | null;
  }): Promise<T>;
  deleteGroup(id: number, authorization: string): Promise<number>;
}
