import { useContext } from 'react'
import { RegisterAndLogin } from '../RegisterAndLogin.jsx'
import { UsuarioContext } from '../Auth/UserContext.jsx'

export function Routes () {
  const { username, id } = useContext(UsuarioContext)

  if (username) {
    return 'logged in' + id
  }

  return (
    <RegisterAndLogin />
  )
}
