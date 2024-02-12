import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bycrypt from 'bcryptjs'
import { WebSocketServer } from 'ws'

import { UserModel } from './Models/Usuario.js'
import { MessageModel } from './Models/Messages.js'

import 'dotenv/config'

const app = express()

app.use(cors(
  {
    origin: ['http://localhost:5173', 'http://192.168.20.26:5173', 'http://172.20.1.110:5173'],
    credentials: true
  }
))
app.use(express.json())
app.use(cookieParser())

const MONGO_URL = process.env.MONGO_URL
const SECRET = process.env.SECRET

const bycryptSalt = bycrypt.genSaltSync(10)

mongoose.connect(MONGO_URL)
  .then(() => { console.log('Connected to MongoDB') }).catch((error) => { console.log('Error connecting to MongoDB', error) })

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/profile', async (req, res) => {
  const token = req.cookies?.token
  if (token) {
    jwt.verify(token, SECRET, {}, (error, userData) => {
      if (error) return res.status(401).json({ error: error.message })
      res.status(200).json(userData)
    })
  } else {
    res.status(401).json({ error: 'Not authorized' })
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const foundUser = await UserModel.findOne({ username })
    if (!foundUser) throw new Error('User not found')
    const isPasswordValid = bycrypt.compareSync(password, foundUser.password)
    if (!isPasswordValid) throw new Error('Invalid password')
    jwt.sign({ userId: foundUser._id, username }, SECRET, {}, (error, token) => {
      if (error) throw error
      res.cookie('token', token, { sameSite: 'none', secure: true }).status(200).json({
        id: foundUser._id
      })
    })
  } catch (error) {
    if (error.message === 'User not found') return res.status(404).json({ error: error.message })
    if (error.message === 'Invalid password') return res.status(401).json({ error: error.message })
    res.status(500).json({ error: error.message })
  }
})

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const hasPassword = bycrypt.hashSync(password, bycryptSalt)
    const CreatedUser = await UserModel.create(
      {
        username,
        password: hasPassword
      }
    )
    jwt.sign({ userId: CreatedUser._id, username }, SECRET, {}, (error, token) => {
      if (error) throw error
      res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
        id: CreatedUser._id
      })
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const server = app.listen(3030, () => {
  console.log('Server is running on http://localhost:3030')
})

const WebSocSer = new WebSocketServer({ server })

WebSocSer.on('connection', (connection, req) => {
  // TODO: extraer el token de las cookies y verificarlo
  const cookies = req.headers.cookie
  if (cookies) {
    const tokenCoorStrg = cookies.split(';').find(str => str.startsWith('token='))
    if (tokenCoorStrg) {
      const token = tokenCoorStrg.split('=')[1]
      jwt.verify(token, SECRET, {}, (error, userData) => {
        if (error) throw error
        const { userId, username } = userData
        connection.userId = userId
        connection.username = username
      })
    }
  };

  connection.on('message', async (message) => {
    const msnData = JSON.parse(message.toString())
    const { recipient, text } = msnData.message

    if (recipient && text) {
      const MsnDoc = await MessageModel.create({
        sender: connection.userId,
        recipient,
        text
      });

      [...WebSocSer.clients]
        .filter(c => c.userId === recipient)
        .forEach(c => c.send(JSON.stringify({
          text,
          sender: connection.userId,
          recipient,
          id: MsnDoc._id
        })))
    }
  });

  // TODO: notificar a todos los clientes conectados que un nuevo usuario se ha conectado
  [...WebSocSer.clients].forEach(client => {
    client.send(JSON.stringify({
      online: [...WebSocSer.clients].map(client => ({ userId: client.userId, username: client.username }))
    }))
  })
})
