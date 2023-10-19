import express from 'express'
import dotenv from 'dotenv'
import mongodb from 'mongoose'

dotenv.config()
const PORT = 3030
const App = express()
const MONGO_URL = process.env.MONGO_URL

mongodb.connect(MONGO_URL)

App.get('/test', (req, res) => {
  res.json('test ok')
})

App.post('/registro', (req, res) => {

})

App.listen(PORT, () => {
  console.log(`Server Running On Port: http://localhost:${PORT}`)
})
