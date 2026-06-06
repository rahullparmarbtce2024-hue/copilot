import jwt from 'jsonwebtoken';
import { User } from '@/types';

const SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || 'default-secret-key';
const EXPIRY = process.env.JWT_EXPIRY || '7d';

interface JwtPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}

export const generateToken = (user: Partial<User>): string => {
  const payload: JwtPayload = {
    userId: user.id!,
    email: user.email!,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, SECRET, { expiresIn: EXPIRY });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.decode(token) as JwtPayload;
  } catch (error) {
    return null;
  }
};
