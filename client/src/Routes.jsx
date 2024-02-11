import { useContext } from 'react'
import { RegisterForm } from './components/Register'
import { UserContext } from './context/UserConterx'
import { Chat } from './components/Chat'

export function Routes () {
  const { user } = useContext(UserContext)

  if (user) {
    return <Chat />
  }

  return (
    <RegisterForm />
  )
}
