const express = require('express');
const dotenv = require('dotenv');

dotenv.config(process.env.MONGO_URL);
const app = express();

app.get('/test', (req, res) => {
  res.json('test ok');
})

app.post('/register', (req, res) => {

})

app.listen(4040);

//mongodb+srv://mernchat:TmeYNGI6OXCrvl3w@cluster0.smc1eaf.mongodb.net/?retryWrites=true&w=majority
//TmeYNGI6OXCrvl3w