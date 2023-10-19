import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongodb from 'mongoose'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import { UserModel } from './Models/Usuario.js'

dotenv.config()

const PORT = 3030
const App = express()
const MONGO_URL = process.env.MONGO_URL
const JWT_SECRET = process.env.SECRET_KEY
const CLIENT_URL = process.env.CLIENT_URL
App.use(express.json())
App.use(cookieParser())
App.use(cors({
  credentials: true,
  origin: CLIENT_URL
}))

mongodb.connect(MONGO_URL)

App.get('/test', (req, res) => {
  res.json('test ok')
})

App.get('/perfil', (req, res) => {
  const token = req.cookies?.token
  if (token) {
    jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
      if (err) throw err
      res.json(userData)
    })
  } else {
    res.status(401).json('No Token')
  }
})

App.post('/registro', async (req, res) => {
  const { nombres, contrasena, documento } = req.body
  const usuario = `CP${documento}`

  try {
    const UsuarioCreado = await UserModel.create({ nombres, usuario, contrasena, documento })
    jwt.sign({ userId: UsuarioCreado._id, username: UsuarioCreado.usuario, nombres: UsuarioCreado.nombres }, JWT_SECRET, {}, (err, token) => {
      if (err) throw err
      res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
        id: UsuarioCreado._id, username: UsuarioCreado.usuario, nomres: UsuarioCreado.nombres
      })
    })
  } catch (err) {
    if (err) throw err
    res.status(500).json('error')
  }
})

App.listen(PORT, () => {
  console.log(`Server Running On Port: http://localhost:${PORT}`)
})
