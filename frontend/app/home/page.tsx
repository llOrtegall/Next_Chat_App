import { redirect } from 'next/navigation';
import { Header } from './header';
import { Footer } from './footer';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/login');
  }

  const { id, name, image } = session.user;

  return (
    <main className='h-screen w-full flex'>
      
      <section className='w-3/12 flex flex-col h-full'>
        <header className='bg-blue-100 px-4 py-3'>
          <Header
            key={id}
            name={name ?? null}
            image={image ?? null}
            username={'no tiene'}
          />
        </header>

        <section className='flex-1 overflow-auto bg-white px-4 py-2'>
          usuarios
        </section>

        <footer className='bg-gray-100 px-4 py-3 flex items-center justify-center'>
          <Footer />
        </footer>
      </section>

      <section className='w-9/12 bg-yellow-100 px-4 py-3'>
        chat
      </section>
    </main>
  );
}