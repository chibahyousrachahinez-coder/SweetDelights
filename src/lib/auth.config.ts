import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      
      if (isOnAdmin) {
        if (isLoggedIn && auth.user.role === 'ADMIN') return true;
        return false; // Redirect unauthenticated users or non-admins
      }
      
      return true;
    },
  },
  providers: [], // Add providers in auth.ts
} satisfies NextAuthConfig;
