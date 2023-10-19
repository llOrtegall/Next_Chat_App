import { useState } from 'react'

export function App () {
  const [usuario, setUsuario] = useState('')
  const [contraseña, setContraseña] = useState('')

  return (
    <section className='bg-blue-200 h-screen flex items-center'>
      <form className='w-64 mx-auto mb-12'>
        <input
          type='text' placeholder='Usuario' value={usuario}
          className='block w-full rounded-md p-2 mb-2 border'
          onChange={ev => setUsuario(ev.target.value)}
        />
        <input
          type='password' placeholder='Contraseña' value={contraseña}
          className='block w-full rounded-md p-2 mb-2 border'
          onChange={ev => setContraseña(ev.target.value)}
        />
        <button className='bg-blue-500 text-white block w-full p-2 rounded-md'>
          Registrarse
        </button>
      </form>
    </section>
  )
}
