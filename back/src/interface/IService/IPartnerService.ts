export default interface IPartnerService<T> {
  getPartners(authorization: string): Promise<T[]>;
  getPartnersByUserId(id: number): Promise<T[]>;
  createPartner({
    authorization,
    groupId,
  }: {
    authorization: string;
    groupId: number;
  }): Promise<T>;
  isPartner({
    authorization,
    groupId,
  }: {
    authorization: string;
    groupId: number;
  }): Promise<boolean>;
}
