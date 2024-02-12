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
const SERVER_PORT = 3030
const PING_INTERVAL = 5000
const DEATH_TIMEOUT = 1000

const bycryptSalt = bycrypt.genSaltSync(10)

mongoose.connect(MONGO_URL)
  .then(() => { console.log('Connected to MongoDB') }).catch((error) => { console.log('Error connecting to MongoDB', error) })

async function getDataFromRequest (req) {
  return new Promise((resolve, reject) => {
    const token = req.cookies?.token
    if (token) {
      jwt.verify(token, SECRET, {}, (error, userData) => {
        if (error) throw error
        resolve(userData)
      })
    } else {
      reject(new Error('No Token'))
    }
  })
}

app.get('/messages/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const userData = await getDataFromRequest(req)
    const outUserId = userData.userId
    const messages = await MessageModel.find({
      sender: { $in: [userId, outUserId] },
      recipient: { $in: [userId, outUserId] }
    }).sort({ createdAt: 1 })
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/people', async (req, res) => {
  try {
    const users = await UserModel.find({}, { _id: 1, username: 1 })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/profile', async (req, res) => {
  const token = req.cookies?.token
  try {
    if (token) {
      jwt.verify(token, SECRET, {}, (error, userData) => {
        if (error) return res.status(401).json({ error: error.message })
        return res.status(200).json(userData)
      })
    } else {
      return res.status(401).json({ error: 'Not authorized' })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
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

app.post('/logout', (req, res) => {
  try {
    res.cookie('token', '', { sameSite: 'none', secure: true }).status(200).json({ message: 'Logged out' })
  } catch (error) {
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

const server = app.listen(SERVER_PORT, () => {
  console.log('Server is running on http://localhost:3030')
})

const WebSokectServerAppChat = new WebSocketServer({ server })

WebSokectServerAppChat.on('connection', (connection, req) => {
  function notifyAboutOnlinePeople () {
    [...WebSokectServerAppChat.clients].forEach(client => {
      client.send(JSON.stringify({
        online: [...WebSokectServerAppChat.clients].map(client => ({ userId: client.userId, username: client.username }))
      }))
    })
  }

  connection.isAlive = true

  connection.timer = setInterval(() => {
    connection.ping()

    if (connection.deathTimer) {
      clearTimeout(connection.deathTimer)
    }

    connection.deathTimer = setTimeout(() => {
      connection.isAlive = false
      connection.terminate()
      notifyAboutOnlinePeople()
      console.log('dead')
    }, DEATH_TIMEOUT)
  }, PING_INTERVAL)

  connection.on('pong', () => {
    clearTimeout(connection.deathTimer)
  })

  const cookies = req.headers.cookie
  if (cookies) {
    const tokenCoorStrg = cookies.split(';').find(str => str.startsWith('token='))
    if (tokenCoorStrg) {
      const token = tokenCoorStrg.split('=')[1]
      jwt.verify(token, SECRET, {}, (error, userData) => {
        if (error) {
          console.error('JWT verification failed:', error)
          connection.terminate()
          return
        }
        const { userId, username } = userData
        connection.userId = userId
        connection.username = username
      })
    }
  }

  connection.on('message', async (message) => {
    const msnData = JSON.parse(message.toString())
    const { recipient, text } = msnData.message

    if (recipient && text) {
      try {
        const MsnDoc = await MessageModel.create({
          sender: connection.userId,
          recipient,
          text
        });

        [...WebSokectServerAppChat.clients]
          .filter(c => c.userId === recipient)
          .forEach(c => c.send(JSON.stringify({
            text,
            sender: connection.userId,
            recipient,
            _id: MsnDoc._id
          })))
      } catch (error) {
        console.error('Failed to create message:', error)
      }
    }
  })

  notifyAboutOnlinePeople()
})

WebSokectServerAppChat.on('close', connection => {
  console.log('Connection closed')
  clearInterval(connection.timer)
  clearTimeout(connection.deathTimer)
  // Remove the connection from the clients set
  WebSokectServerAppChat.clients.delete(connection)
})
