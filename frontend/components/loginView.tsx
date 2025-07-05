import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "@/auth";

export default function LoginView() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div>
        <Card className="w-96 shadow-xl border-2 ">
          <CardHeader className="flex flex-col items-center gap-2">
            <CardTitle className="text-2xl font-bold">Inicia sesión</CardTitle>
            <CardDescription className="text-center">Accede con tu cuenta de Google para continuar</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <form action={async () => {
              "use server";
              await signIn('google')
            }}>
              <Button
                variant="outline"
                className="cursor-pointer w-full"
              >
                <Image src="/google.svg" alt="Google Icon" width={24} height={24} />
                Iniciar sesión con Google
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
