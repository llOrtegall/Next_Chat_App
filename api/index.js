// const express = require('express');
const dotenv = require('dotenv');
// const mogoose = require('mongoose');
// const User = require('./models/User');

import express from "express";
import { mongo } from "mongoose";
import "./models/User.js";


dotenv.config();
mongo.connect(process.env.MONGO_URL);

const app = express();

// * primer EndPoint
app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  await User.create({ username, password });
});

app.listen(4040);

// KPA2I7qSdnwCoD4f
//mongodb+srv://mernchat:<password>@cluster0.smc1eaf.mongodb.net/?retryWrites=true&w=majority