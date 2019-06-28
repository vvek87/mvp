const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3002;

const webshot = require('webshot');
const fs = require('fs');
const path = require('path');


const hash = require('string-hash');


app.use(express.static(__dirname + '/../public/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send(200);
});


app.post('/submit', (req, res) => {
  let checkedLink = req.body.newLink;
  console.log('CHECK LINK---', checkedLink)
    if (!checkedLink.includes('//')) {
      checkedLink = 'https://'.concat(checkedLink);
    }

  let renderStream = webshot(req.body.newLink)
  let writeSite = fs.createWriteStream(path.join(__dirname, '../public/images/' + hash(req.body.newLink) + '.png'));

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