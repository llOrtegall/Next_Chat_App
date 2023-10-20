import { useContext } from 'react'
import { RegisterForm } from '../components/RegisterForm.jsx'
import { UsuarioContext } from '../Auth/UserContext.jsx'
import { LoginForm } from '../components/LoginForm.jsx'

export function Routes () {
  const { username, id, nombres } = useContext(UsuarioContext)

  if (username) {
    return 'logged in' + id + ' ' + username + ' ' + nombres
  }

  return (
    // <RegisterForm />
    <LoginForm />
  )
}
