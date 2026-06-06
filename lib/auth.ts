import bcrypt from 'bcryptjs';
import prisma from './prisma';
import { Prisma } from '@prisma/client';
import { generateToken, verifyToken } from './jwt';
import { User } from '@/types';

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const registerUser = async (
  email: string,
  password: string,
  fullName: string,
  educationLevel: string
): Promise<{ user: User; token: string } | null> => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        educationLevel: educationLevel || 'HIGH_SCHOOL',
      },
    });

    // Safely cast Prisma user to custom User type
    const appUser = user as unknown as User;

    // Generate token
    const token = generateToken(appUser);

    return { user: appUser, token };
  } catch (error) {
    console.error('Registration error:', error);
    return null;
  }
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<{ user: User; token: string } | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('User account is inactive');
    }

    // Safely cast Prisma user to custom User type
    const appUser = user as unknown as User;

    // Generate token
    const token = generateToken(appUser);

    return { user: appUser, token };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) return null;
    
    return user as unknown as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string,
  data: Prisma.UserUpdateInput 
): Promise<User | null> => {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data, 
    });
    return user as unknown as User; 
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

export const validateToken = async (token: string): Promise<User | null> => {
  try {
    const payload = verifyToken(token);
    if (!payload) return null;

    const user = await getUserById(payload.userId);
    return user;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
};
