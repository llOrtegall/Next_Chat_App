import { UserContextProvider } from './Auth/UserContext'
import { Routes } from './Routes/Routes'
import axios from 'axios'

export function App () {
  axios.defaults.baseURL = 'http://localhost:3030'
  axios.defaults.withCredentials = true

  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}
