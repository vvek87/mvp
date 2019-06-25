const express = require('express');
const app = express();
const port = 3002;

app.use(express.static(__dirname + '/../public/'));


app.get('/', (req, res) => {
  res.send(200);
});


app.listen(port, () => {
  console.log('Listening on port: ', port);
});