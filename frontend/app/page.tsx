import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-300'>
      {/* Hero Section */}
      <section className='flex-1 flex flex-col items-center justify-center text-center px-4'>
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-5xl md:text-6xl font-extrabold text-blue-700 drop-shadow mb-4'>React Chat MSERN</h1>
          <p className='text-xl md:text-2xl text-blue-600 mb-8 font-medium'>
            Un chat moderno y seguro construido con <span className='font-bold text-blue-800'>React</span>, <span className='font-bold text-blue-800'>Next.js</span>, <span className='font-bold text-blue-800'>Node.js</span> y <span className='font-bold text-blue-800'>PostgreSQL</span>.
          </p>
          <p className='text-md md:text-lg text-blue-500 mb-10'>
            Conéctate, conversa y comparte en tiempo real con una experiencia rápida y confiable.<br />
            ¡Tu privacidad y seguridad son nuestra prioridad!
          </p>
          <Link href='/login'>
            Get Started
          </Link>

        </div>
      </section>
    </main>
  );
}
