
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  console.log(session);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between bg-white/80 shadow-md backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-700 drop-shadow">React Chat MSERN</h1>
            <p className="text-sm text-blue-500 font-medium">Bienvenido, {session.user?.name}</p>
          </div>
        </div>
        <Button
          onClick={async () => {
            "use server";
            await signOut({ redirectTo: '/'});
          }}
          className="cursor-pointer"
        >
          Cerrar sesión
        </Button>
      </header>

      {/* Main Content */}
      <section className="flex-1 flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto w-full">
        {/* Sidebar or Users List Placeholder */}
        <aside className="w-full md:w-1/4 bg-white/70 rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8 md:mb-0">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Usuarios conectados</h2>
          <div className="w-full h-64 bg-blue-50 rounded-lg flex items-center justify-center text-blue-300">
            {/* Aquí irá la lista de usuarios conectados */}
            <span>Próximamente...</span>
          </div>
        </aside>

        {/* Chat Area Placeholder */}
        <section className="flex-1 bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Chat</h2>
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto mb-4 bg-blue-50 rounded-lg p-4 min-h-[300px]">
            {/* Aquí irán los mensajes del chat */}
            <span className="text-blue-300 text-center">¡El chat estará disponible pronto!</span>
          </div>
          <form className="flex gap-2 mt-2">
            {/* Input de mensaje y botón enviar (placeholder) */}
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow"
              disabled
            />
            <Button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600" disabled>
              Enviar
            </Button>
          </form>
        </section>
      </section>

    </main>
  );
}