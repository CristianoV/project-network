import bcrypt = require('bcryptjs');

export default class BcryptService {
  private static generateSalt(): string {
    return bcrypt.genSaltSync();
  }

  public static encrypt(text: string): string {
    return bcrypt.hashSync(text, this.generateSalt());
  }

  public static compare(encryptText: string, planText: string): boolean {
    return bcrypt.compareSync(planText, encryptText);
  }
}