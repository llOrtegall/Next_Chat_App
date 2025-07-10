"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod/v4";


const FormLogin = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6 drop-shadow-lg">Iniciar Sesión</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      className="border-2 border-indigo-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200 rounded-lg px-4 py-2 bg-white/80 text-gray-900 shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      className="border-2 border-indigo-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all duration-200 rounded-lg px-4 py-2 bg-white/80 text-gray-900 shadow-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-3 text-lg font-bold bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 hover:from-pink-500 hover:to-indigo-500 transition-transform duration-200"
            >
              Entrar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default FormLogin