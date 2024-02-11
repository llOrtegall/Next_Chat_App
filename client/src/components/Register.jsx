import axios from 'axios'
import { useState } from 'react'

export function RegisterForm () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    try {
      const response = await axios.post('/register', { username, password })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="flex items-center h-screen">
      <form className="w-64 mx-auto flex flex-col gap-2 pb-12" onSubmit={handleSubmit}>

        <input placeholder="Username"
          value={username} onChange={ev => setUsername(ev.target.value)}
          type="text" name="username"
          className="w-full rounded-md p-2 outline-none" />

        <input placeholder="Password"
          value={password} onChange={ev => setPassword(ev.target.value)}
          type="password" name="password"
          className="w-full rounded-md p-2 outline-none" />

        <button className="bg-blue-500 text-white block w-full p-2 rounded-md font-semibold">Register</button>
      </form>
    </section>
  )
}
