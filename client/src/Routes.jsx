import { useContext } from 'react'
import { RegisterForm } from './components/Register'
import { UserContext } from './context/UserConterx'

export function Routes () {
  const { user } = useContext(UserContext)

  if (user) {
    return 'You are logged in!' + user
  }

  return (
    <RegisterForm />
  )
}
