import axios from 'axios'
import { useContext, useState } from 'react'
import { UsuarioContext } from '../Auth/UserContext'

export function LoginForm () {
  const [username, setUsername] = useState('')
  const [contrasena, setContrasena] = useState('')
  const { setUsername: setUserWithLogin, setId, setNombres: setNombresWithRegister } = useContext(UsuarioContext)

  const loginUser = async (ev) => {
    ev.preventDefault()
    const { data } = await axios.post('/login', { username, contrasena })
    const { id, nombres } = data
    setUserWithLogin(username)
    setId(id)
    setNombresWithRegister(nombres)
  }

  return (
    <section className='bg-blue-200 h-screen w-screen grid place-content-center pb-20 text-center'>
      <form className='w-64 mx-auto' onSubmit={loginUser}>
        <h2 className='text-center py-4 font-bold text-xl'>Iniciar Session</h2>
        <input
          type='text' placeholder='Usuario' value={username}
          className='block w-full rounded-md p-2 mb-2 border'
          onChange={ev => setUsername(ev.target.value)} required
        />
        <input
          type='password' placeholder='Contraseña' value={contrasena}
          className='block w-full rounded-md p-2 mb-2 border' required
          onChange={ev => setContrasena(ev.target.value)}
        />
        <button className='bg-blue-500 text-white block w-full p-2 rounded-md'>
          Ingresar
        </button>
        <article className='text-center pt-2'>
          No Tienes Usuario Creado ?
        </article>
      </form>
      <button className='text-red-600 font-semibold pl-2 underline hover:text-blue-600'>
        Registrarse Aquí
      </button>
    </section>
  )
}
