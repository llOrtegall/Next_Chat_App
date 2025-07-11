"use server"

import { loginSchema, registerSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import { z } from "zod/v4";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    const { success, data, error } = loginSchema.safeParse(values);

    if (!success) {
      console.log("Validation error:", error);
      return { error: "Invalid login data" };
    }
    
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    })

    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message || "An error occurred during login." };
    }
    throw new Error("Login failed. Please check your credentials.");
  }
}

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  try {
    const { success, data, error } = registerSchema.safeParse(values);

    if (!success) {
      console.log("Validation error:", error);
      
      return {
        error: "Invalid data"
      }
    }

    // verify if the user already exists
    const userExists = await db.user.findUnique({
      where: {
        email: data.email,
      }
    })

    if (userExists) {
      return {
        error: "User already exists"
      }
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: passwordHash
      }
    })

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    return { success: true };

  } catch (error) {
    console.error("Registration failed:", error);
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message || "An error occurred during registration." };
    }
    throw new Error("Registration failed. Please check your credentials.");
  }
}