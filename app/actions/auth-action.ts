"use server"

import { loginSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import { z } from "zod/v4";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false
    })
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
}