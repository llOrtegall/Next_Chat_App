import { useState, createContext } from 'react'

export const UsuarioContext = createContext({})

export function UserContextProvider ({ children }) {
  const [username, setUsername] = useState(null)
  const [id, setId] = useState(null)

  return (
    <UsuarioContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UsuarioContext.Provider>
  )
}
