export function App () {
  return (
    <div className='bg-blue-200 h-screen'>
      <form className='w-64 mx-auto'>
        <input type='text' placeholder='Usuario' className='block' />
        <input type='password' placeholder='Contraseña' className='block' />
        <button className='bg-blue-500 text-white block w-full p-2'>Registrarse</button>
      </form>
    </div>
  )
}
