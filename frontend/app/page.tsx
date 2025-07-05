import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* Hero Section */}
      <section className='flex flex-col items-center justify-center min-h-screen text-center px-4 py-20'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='space-y-4'>
            <h1 className='text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              React Chat MSERN
            </h1>
            <p className='text-2xl md:text-3xl text-gray-300 font-light'>
              Aplicación de chat en tiempo real
            </p>
            <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
              Proyecto desarrollado para demostrar habilidades en desarrollo full-stack moderno con tecnologías de vanguardia
            </p>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link href='/login'>
              <Button size='lg' className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg'>
                Probar Demo
              </Button>
            </Link>
            <Button variant='outline' size='lg' className='border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg'>
              Ver Código
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
            Stack Tecnológico
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <Card className='bg-gray-800/50 border-gray-700 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='text-blue-400'>Frontend</CardTitle>
                <CardDescription className='text-gray-300'>Interfaz moderna y responsiva</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Next.js 15 (App Router)</li>
                  <li>• React 18 + TypeScript</li>
                  <li>• Tailwind CSS + shadcn/ui</li>
                  <li>• NextAuth.js</li>
                </ul>
              </CardContent>
            </Card>

            <Card className='bg-gray-800/50 border-gray-700 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='text-green-400'>Backend</CardTitle>
                <CardDescription className='text-gray-300'>API robusta y escalable</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-gray-300'>
                  <li>• Node.js + Express</li>
                  <li>• WebSocket (ws) para tiempo real</li>
                  <li>• TypeScript</li>
                  <li>• JWT Authentication</li>
                </ul>
              </CardContent>
            </Card>

            <Card className='bg-gray-800/50 border-gray-700 backdrop-blur-sm'>
              <CardHeader>
                <CardTitle className='text-purple-400'>Base de Datos</CardTitle>
                <CardDescription className='text-gray-300'>Persistencia confiable</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-gray-300'>
                  <li>• PostgreSQL</li>
                  <li>• Prisma ORM</li>
                  <li>• Migraciones automáticas</li>
                  <li>• Relaciones complejas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4 bg-gray-800/30'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
            Características Principales
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>⚡</span>
              </div>
              <h3 className='text-xl font-semibold text-white'>Tiempo Real</h3>
              <p className='text-gray-400'>Mensajes instantáneos con WebSocket</p>
            </div>
            
            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>🔐</span>
              </div>
              <h3 className='text-xl font-semibold text-white'>Seguridad</h3>
              <p className='text-gray-400'>Autenticación OAuth con Google</p>
            </div>
            
            <div className='text-center space-y-4'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-2xl'>📱</span>
              </div>
              <h3 className='text-xl font-semibold text-white'>Responsivo</h3>
              <p className='text-gray-400'>Diseño adaptable a cualquier dispositivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent'>
            Arquitectura del Sistema
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-6'>
              <div className='space-y-4'>
                <h3 className='text-2xl font-semibold text-white'>Diseño Modular</h3>
                <p className='text-gray-400'>
                  Aplicación construida con patrones modernos de desarrollo, separación de responsabilidades y código limpio.
                </p>
              </div>
              <div className='space-y-4'>
                <h3 className='text-2xl font-semibold text-white'>Escalabilidad</h3>
                <p className='text-gray-400'>
                  Arquitectura preparada para crecer, con microservicios y manejo eficiente de conexiones concurrentes.
                </p>
              </div>
              <div className='space-y-4'>
                <h3 className='text-2xl font-semibold text-white'>Performance</h3>
                <p className='text-gray-400'>
                  Optimizaciones en cada capa: SSR con Next.js, consultas eficientes y conexiones WebSocket optimizadas.
                </p>
              </div>
            </div>
            <div className='bg-gray-800/50 rounded-lg p-8 border border-gray-700'>
              <div className='space-y-4'>
                <div className='flex items-center gap-4'>
                  <div className='w-4 h-4 bg-blue-500 rounded-full'></div>
                  <span className='text-gray-300'>Cliente (Next.js + React)</span>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-4 h-4 bg-green-500 rounded-full'></div>
                  <span className='text-gray-300'>API REST (Express + TypeScript)</span>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-4 h-4 bg-purple-500 rounded-full'></div>
                  <span className='text-gray-300'>WebSocket Server (ws)</span>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-4 h-4 bg-pink-500 rounded-full'></div>
                  <span className='text-gray-300'>Base de Datos (PostgreSQL)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <h2 className='text-4xl font-bold text-white'>¿Listo para explorar?</h2>
          <p className='text-xl text-gray-300'>
            Prueba la aplicación en vivo y experimenta todas las funcionalidades
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/login'>
              <Button size='lg' className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg'>
                Iniciar Demo
              </Button>
            </Link>
            <Button variant='outline' size='lg' className='border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg'>
              Contactar Desarrollador
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 px-4 bg-gray-900/50 border-t border-gray-800'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400'>© 2025 React Chat MSERN. Proyecto de demostración.</p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>GitHub</a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>LinkedIn</a>
            <a href='#' className='text-gray-400 hover:text-white transition-colors'>Portfolio</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
