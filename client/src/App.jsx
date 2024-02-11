import { RegisterForm } from './components/Register'
import axios from 'axios'

export function App () {
  axios.defaults.baseURL = 'http://localhost:3030'
  axios.defaults.withCredentials = true

  return (
    <RegisterForm />
  )
}
