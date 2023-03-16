import * as jtw from 'jsonwebtoken';

export default class JwtSecret {
  private static algorithm = { algorithm: 'HS256', expiresIn: '24h' } as Record<string, string>;
  private static segredo = process.env.JWT_SECRET || 'ssw0rdEncryptSaltJWT';

  public static sign(payload: Record<string, string | number>): string {
    return jtw.sign(payload, this.segredo, this.algorithm);
  }

  public static verify(token: string): Record<string, string | number> {
    return jtw.verify(token, this.segredo) as Record<string, string | number>;
  }
}