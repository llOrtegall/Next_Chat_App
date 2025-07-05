import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <main className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='flex flex-col items-center justify-center min-h-screen text-center px-4 py-20 border-b border-gray-200'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <div className='space-y-6'>
            <h1 className='text-5xl md:text-6xl font-light text-gray-900 tracking-tight'>
              Chat Application
            </h1>
            <p className='text-xl md:text-2xl text-gray-600 font-light'>
              Solución empresarial de comunicación en tiempo real
            </p>
            <p className='text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed'>
              Plataforma profesional desarrollada con tecnologías modernas para facilitar la comunicación efectiva en equipos de trabajo
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
            <Link href='/login'>
              <Button
                size='lg'
              >
                Acceder a la Plataforma
              </Button>
            </Link>
            <Button
              variant='outline' size='lg'
            >
              Documentación
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className='py-20 px-4 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-light text-center mb-16 text-gray-900'>
            Tecnologías Implementadas
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <Card className='bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-gray-900 text-lg font-medium'>Frontend</CardTitle>
                <CardDescription className='text-gray-600'>Interfaz moderna y responsiva</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-gray-700 text-sm'>
                  <li>• Next.js 15 (App Router)</li>
                  <li>• React 18 + TypeScript</li>
                  <li>• Tailwind CSS + shadcn/ui</li>
                  <li>• NextAuth.js</li>
                </ul>
              </CardContent>
            </Card>

            <Card className='bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-gray-900 text-lg font-medium'>Backend</CardTitle>
                <CardDescription className='text-gray-600'>API robusta y escalable</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-gray-700 text-sm'>
                  <li>• Node.js + Express</li>
                  <li>• WebSocket (ws) para tiempo real</li>
                  <li>• TypeScript</li>
                  <li>• JWT Authentication</li>
                </ul>
              </CardContent>
            </Card>

            <Card className='bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
              <CardHeader className='pb-4'>
                <CardTitle className='text-gray-900 text-lg font-medium'>Base de Datos</CardTitle>
                <CardDescription className='text-gray-600'>Persistencia confiable</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2 text-gray-700 text-sm'>
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
      <section className='py-20 px-4 bg-white border-b border-gray-200'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-light text-center mb-16 text-gray-900'>
            Características Principales
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
            <div className='text-center space-y-4'>
              <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-xl text-gray-600'>⚡</span>
              </div>
              <h3 className='text-lg font-medium text-gray-900'>Comunicación Instantánea</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>Mensajes en tiempo real con tecnología WebSocket para comunicación fluida</p>
            </div>

            <div className='text-center space-y-4'>
              <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-xl text-gray-600'>🔐</span>
              </div>
              <h3 className='text-lg font-medium text-gray-900'>Seguridad Empresarial</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>Autenticación robusta con OAuth y protección de datos empresariales</p>
            </div>

            <div className='text-center space-y-4'>
              <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto'>
                <span className='text-xl text-gray-600'>📱</span>
              </div>
              <h3 className='text-lg font-medium text-gray-900'>Multiplataforma</h3>
              <p className='text-gray-600 text-sm leading-relaxed'>Acceso desde cualquier dispositivo con diseño responsivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className='py-20 px-4 bg-gray-50'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-light text-center mb-16 text-gray-900'>
            Arquitectura del Sistema
          </h2>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='space-y-8'>
              <div className='space-y-3'>
                <h3 className='text-xl font-medium text-gray-900'>Diseño Modular</h3>
                <p className='text-gray-600 leading-relaxed'>
                  Arquitectura basada en componentes con separación clara de responsabilidades y patrones de desarrollo empresarial.
                </p>
              </div>
              <div className='space-y-3'>
                <h3 className='text-xl font-medium text-gray-900'>Escalabilidad</h3>
                <p className='text-gray-600 leading-relaxed'>
                  Diseño preparado para crecimiento empresarial con manejo eficiente de múltiples conexiones concurrentes.
                </p>
              </div>
              <div className='space-y-3'>
                <h3 className='text-xl font-medium text-gray-900'>Rendimiento</h3>
                <p className='text-gray-600 leading-relaxed'>
                  Optimización en cada capa del stack con renderizado del lado del servidor y consultas de base de datos eficientes.
                </p>
              </div>
            </div>
            <div className='bg-white rounded-lg p-8 border border-gray-200 shadow-sm'>
              <div className='space-y-6'>
                <div className='flex items-center gap-4'>
                  <div className='w-3 h-3 bg-gray-900 rounded-full'></div>
                  <span className='text-gray-700'>Cliente (Next.js + React)</span>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-3 h-3 bg-gray-700 rounded-full'></div>
                  <span className='text-gray-700'>API REST (Express + TypeScript)</span>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-3 h-3 bg-gray-500 rounded-full'></div>
                  <span className='text-gray-700'>WebSocket Server (ws)</span>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='w-3 h-3 bg-gray-400 rounded-full'></div>
                  <span className='text-gray-700'>Base de Datos (PostgreSQL)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 bg-white border-b border-gray-200'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <h2 className='text-3xl font-light text-gray-900'>Comience a utilizar la plataforma</h2>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Acceda a la aplicación y experimente las funcionalidades de comunicación empresarial
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4'>
            <Link href='/login'>
              <Button size='lg'>
                Acceder Ahora
              </Button>
            </Link>
            <Button variant='outline' size='lg'>
              Información de Contacto
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 px-4 bg-gray-50'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-500 text-sm'>© 2025 Chat Application. Plataforma empresarial de comunicación.</p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <a href='#' className='text-gray-500 hover:text-gray-700 transition-colors text-sm'>GitHub</a>
            <a href='#' className='text-gray-500 hover:text-gray-700 transition-colors text-sm'>LinkedIn</a>
            <a href='#' className='text-gray-500 hover:text-gray-700 transition-colors text-sm'>Documentación</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
