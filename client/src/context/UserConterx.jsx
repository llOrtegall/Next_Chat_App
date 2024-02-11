import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext({})

export function UserProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => {
    axios.get('/profile')
      .then(res => {
        setId(res.data.userId)
        setUser(res.data.username)
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, id, setId }}>
      {children}
    </UserContext.Provider>
  )
}
