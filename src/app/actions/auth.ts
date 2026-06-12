'use server';

import { signIn, signOut, auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function signUpUser(formData: FormData) {
  try {
    const rawData = {
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
    };

    const validatedData = signUpSchema.parse(rawData);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 10);

    // Create user
    await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
        name: validatedData.name,
        role: 'CUSTOMER', // Default role
      },
    });

    // Automatically sign in after signup
    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: 'Failed to create account. Please try again.' };
  }
}

export async function signInUser(formData: FormData) {
  try {
    const rawData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const validatedData = signInSchema.parse(rawData);

    await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirectTo: '/',
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Something went wrong. Please try again.' };
      }
    }
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    throw error;
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user || null;
}
