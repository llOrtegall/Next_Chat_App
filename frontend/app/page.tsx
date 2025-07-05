import { auth } from "@/auth";
import LoginView from "@/components/loginView";

export default async function Home() {
  const session = await auth();

  console.log(session);
  const user = session?.user;

  return (
    <section className="h-screen flex flex-col items-center justify-center">
      {
        user && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Bienvenido, {user.name}!</h1>
          </div>
        )
      }

      {
        !user && (
          <LoginView />
        )
      }
    </section>
  );
}
