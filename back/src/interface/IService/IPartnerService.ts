export default interface IPartnerService<T> {
  getPartners(authorization: string): Promise<T[]>;
  getPartnersByUserId(id: number): Promise<T[]>;
}