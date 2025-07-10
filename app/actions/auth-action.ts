"use server"

import { loginSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import { z } from "zod/v4";
import { AuthError } from "next-auth";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    })
  } catch (error) {
    console.error("Login failed:", error);
    if(error instanceof AuthError){
      return { error: error.cause?.err?.message || "An error occurred during login." };
    }
    throw new Error("Login failed. Please check your credentials.");
  }
}