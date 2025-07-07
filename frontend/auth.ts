import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import NextAuth from 'next-auth';
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID || ' ',
        clientSecret: process.env.AUTH_GOOGLE_SECRET || ' ',
    }),
    GitHub({
        clientId: process.env.AUTH_GITHUB_ID || ' ',
        clientSecret: process.env.AUTH_GITHUB_SECRET || ' ',
    })
  ]
})