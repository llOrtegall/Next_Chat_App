const express = require('express');

const app = express();

// * primer EndPoint
app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', (req, res) => {

});

app.listen(4040);