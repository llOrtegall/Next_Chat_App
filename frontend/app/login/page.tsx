import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { signIn } from '@/auth';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <section className='h-screen flex items-center justify-center'>
      <div>
        <Card className='w-96 shadow-xl border-2 '>
          <CardHeader className='flex flex-col items-center gap-2'>
            <CardTitle className='text-2xl font-bold'>Inicia sesión</CardTitle>
            <CardDescription className='text-justify'>Accede con tu cuenta de Google ó GitHub para continuar, al iniciar por primera vez debes establecer un username único.</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col items-center'>
            <form action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/home'})
            }}>
              <Button
                variant='outline'
                className='cursor-pointer w-full'
              >
                <Image src='/google.svg' alt='Google Icon' width={24} height={24} />
                Iniciar sesión con Google
              </Button>
            </form>
          </CardContent>
          <CardContent className='flex flex-col items-center'>
            <form action={async () => {
              'use server';
              await signIn('github', { redirectTo: '/home'})
            }}>
              <Button
                variant='outline'
                className='cursor-pointer w-full'
              >
                <Image src='/github.svg' alt='GitHub Icon' width={24} height={24} />
                Iniciar sesión con GitHub
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
