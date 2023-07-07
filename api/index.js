const express = require('express');
const dotenv = require('dotenv');
const mogoose = require('mongoose');

dotenv.config();
mogoose.connect(process.env.MONGO_URL);

const app = express();

// * primer EndPoint
app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', (req, res) => {

});

app.listen(4040);

// KPA2I7qSdnwCoD4f
//mongodb+srv://mernchat:<password>@cluster0.smc1eaf.mongodb.net/?retryWrites=true&w=majority