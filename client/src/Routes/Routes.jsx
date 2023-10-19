import { useContext } from 'react'
import { RegisterAndLogin } from '../RegisterAndLogin.jsx'
import { UsuarioContext } from '../Auth/UserContext.jsx'

export function Routes () {
  const { username, id, nombres } = useContext(UsuarioContext)

  if (username) {
    return 'logged in' + id + ' ' + username + ' ' + nombres
  }

  return (
    <RegisterAndLogin />
  )
}
