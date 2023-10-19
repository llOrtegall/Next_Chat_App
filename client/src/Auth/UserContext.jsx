import axios from 'axios'
import { useState, createContext, useEffect } from 'react'

export const UsuarioContext = createContext({})

export function UserContextProvider ({ children }) {
  const [username, setUsername] = useState(null)
  const [id, setId] = useState(null)
  const [nombres, setNombres] = useState(null)

  useEffect(() => {
    axios.get('/perfil').then(response => {
      setNombres(response.data.nombres)
      setId(response.data.userId)
      setUsername(response.data.username)
    })
  })

  return (
    <UsuarioContext.Provider value={{ username, setUsername, id, setId, nombres, setNombres }}>
      {children}
    </UsuarioContext.Provider>
  )
}
