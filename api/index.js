import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { UserModel } from './Models/Usuario.js'

import 'dotenv/config'

const app = express()

app.use(cookieParser())
app.use(cors(
  {
    origin: 'http://192.168.20.26:5173',
    credentials: true
  }
))
app.use(express.json())

const MONGO_URL = process.env.MONGO_URL
const SECRET = process.env.SECRET

mongoose.connect(MONGO_URL)
  .then(() => { console.log('Connected to MongoDB') }).catch((error) => { console.log('Error connecting to MongoDB', error) })

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body
    const CreatedUser = await UserModel.create({ username, password })
    jwt.sign({ userId: CreatedUser._id }, SECRET, {}, (error, token) => {
      if (error) throw error
      res.cookie('token', token).status(201).json('ok')
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3030, () => {
  console.log('Server is running on http://localhost:3030')
})
