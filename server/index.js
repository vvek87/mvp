const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3002;

const webshot = require('webshot');
const fs = require('fs');
const path = require('path');

app.use(express.static(__dirname + '/../public/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send(200);
});


app.post('/submit', (req, res) => {
  let renderStream = webshot(req.body.newLink)
  let writeSite = fs.createWriteStream(path.join(__dirname, '../public/images/' + req.body.newLink.split('.')[0] + '.png'));

  renderStream.on('data', (chunk) => {
    writeSite.write(chunk.toString('binary'), 'binary');
  });

  renderStream.on('end', () => {
    res.send(req.body.newLink);
  })

});


app.listen(port, () => {
  console.log('Listening on port: ', port);
});