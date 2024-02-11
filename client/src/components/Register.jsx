import axios from 'axios'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserConterx'

export function RegisterForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [isLoggingIn, setIsLoggingIn] = useState('register')

  const { setUser, setId } = useContext(UserContext)

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const url = isLoggingIn === 'register' ? '/register' : '/login'
    try {
      const { data } = await axios.post(url, { username, password })
      setUser(username)
      setId(data.id)
    } catch (error) {
      setError(error.response.data.error)
    }
  }

  return (
    <section className="flex items-center h-screen">
      <form className="w-64 mx-auto flex flex-col gap-2 pb-12" onSubmit={handleSubmit}>

        <input placeholder="Username" required
          value={username} onChange={ev => setUsername(ev.target.value)}
          type="text" name="username"
          className="w-full rounded-md p-2 outline-none" />

        <input placeholder="Password" required
          value={password} onChange={ev => setPassword(ev.target.value)}
          type="password" name="password"
          className="w-full rounded-md p-2 outline-none" />

        <button className="bg-blue-500 text-white block w-full p-2 rounded-md font-semibold">
          {isLoggingIn === 'register' ? 'Register' : 'Login'}
        </button>
        <div>
          {isLoggingIn === 'register' && (
            <div>
              Al ready a menber ?
              <button onClick={() => setIsLoggingIn('login')}>Login Here</button>
            </div>
          )}
          {isLoggingIn === 'login' && (
            <div>
              dont Have an account ?
              <button onClick={() => setIsLoggingIn('register')}>Register</button>
            </div>
          )}
        </div>
        {
          error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )
        }
      </form>
    </section>
  )
}
