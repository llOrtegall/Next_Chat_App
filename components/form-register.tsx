"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerAction } from "@/app/actions/auth-action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner"
import { z } from "zod/v4";

const FormRegister = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(async () => {
      try {
        const response = await registerAction(values);
        if (response?.error) {
          toast.error(response.error);
        } else {
          router.push("/dashboard");
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "An error occurred");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">Registrar Usuario</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jhon Doe Smith"
                      {...field}
                      className="h-11 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-3 py-2 bg-white text-gray-900 placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@example.com"
                      {...field}
                      className="h-11 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-3 py-2 bg-white text-gray-900 placeholder:text-gray-500"
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
                  <FormLabel className="text-sm font-medium text-gray-700">Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="h-11 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md px-3 py-2 bg-white text-gray-900 placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Registrando..." : "Registrar"}
            </Button>
          </form>
        </Form>
        <section>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">¿Ya tienes una cuenta?</p>
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 mt-2"
              onClick={() => router.push("/login")}
            >
              Inicia sesión aquí
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FormRegister