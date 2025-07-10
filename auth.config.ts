import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { loginSchema } from "./lib/zod";
import { db } from "./lib/db";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
    Credentials({
      authorize: async (credentials) => {

        const { success, data, error } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error(error?.message || "Invalid credentials.");
        }

        const user = await db.user.findUnique({
          where: {
            email: data.email
          }
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials.");
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);

        if (!isValidPassword) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user.id,
          role: user.role || null,
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      }
    }),
  ],
} satisfies NextAuthConfig