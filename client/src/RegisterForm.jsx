import axios from 'axios'
import { useContext, useState } from 'react'
import { UsuarioContext } from './Auth/UserContext'

export function RegisterForm () {
  const [nombres, setNombres] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [documento, setDocumento] = useState('')
  const { setUsername, setId, setNombres: setNombresWithRegister } = useContext(UsuarioContext)

  const registerUser = async (ev) => {
    ev.preventDefault()
    const { data } = await axios.post('/registro', { nombres, contrasena, documento })
    const { id, username } = data
    setUsername(username)
    setId(id)
    setNombresWithRegister(nombres)
  }

  return (
    <section className='bg-blue-200 h-screen w-screen grid place-content-center pb-20'>
      <form className='w-64 mx-auto' onSubmit={registerUser}>
        <h2 className='text-center py-4 font-bold text-xl'>Registrar Usuario</h2>
        <input
          type='text' placeholder='Nombres Completos' value={nombres}
          className='block w-full rounded-md p-2 mb-2 border'
          onChange={ev => setNombres(ev.target.value)} required
        />
        <input
          type='text' placeholder='N° Documento' value={documento}
          className='block w-full rounded-md p-2 mb-2 border'
          onChange={ev => setDocumento(ev.target.value)} required
        />
        <input
          type='password' placeholder='Crea Una Contraseña' value={contrasena}
          className='block w-full rounded-md p-2 mb-2 border' required
          onChange={ev => setContrasena(ev.target.value)}
        />
        <button className='bg-blue-500 text-white block w-full p-2 rounded-md'>
          Registrarse
        </button>
        <article className='text-center pt-2'>
          Ya Estás Registrado ?
        </article>
      </form>

      <button className='text-red-600 font-semibold pl-2 underline hover:text-blue-600'>
        Iniciar Sesión
      </button>
    </section>
  )
}
