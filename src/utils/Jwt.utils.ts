import jwt, { Jwt, JwtPayload, SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

class JwtUtils {
  private static privateKey: string = fs.readFileSync(
    path.join(__dirname, '../key/private.pem'),
    'utf8',
  );

  private static publicKey: string = fs.readFileSync(
    path.join(__dirname, '../key/public.pem'),
    'utf8',
  );

  static generateToken(payload: object, expiresIn: string): string {
    const signOptions: SignOptions = {
      algorithm: 'RS256',
      expiresIn: expiresIn as any, // Default expiration time
    };

    return jwt.sign(payload, this.privateKey, signOptions);
  }

  static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, this.publicKey, {
      algorithms: ['RS256'],
    }) as JwtPayload;
  }

  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch (error: any) {
      console.error('Token decoding failed:', error.message);
      return null;
    }
  }
}

export default JwtUtils;
