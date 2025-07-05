import { redirect } from "next/navigation";
import { Header } from "@/app/home/header";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const { id, name, image } = session.user;

  return (
    <main className="h-screen w-full flex">
      <section className="flex w-10/12">

        <aside className="bg-blue-100 w-3/12 px-4 py-3">
          usuarios
        </aside>

        <section className="bg-yellow-100 w-9/12 px-4 py-3">
          chat
        </section>

      </section>

      <header className="w-2/12 bg-red-100 px-4 py-3">
        <Header key={id} name={name} image={image} username={'not exist'} />
      </header>

    </main>
  );
}