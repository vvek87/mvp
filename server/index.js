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
    if (!checkedLink.includes('//')) {
      checkedLink = 'https://'.concat(checkedLink);
    }

  let renderStream = webshot(req.body.newLink)
  let writeSite = fs.createWriteStream(path.join(__dirname, '../public/images/' + hash(checkedLink) + '.png'));

  renderStream.on('data', (chunk) => {
    writeSite.write(chunk.toString('binary'), 'binary');
  });

  renderStream.on('end', () => {
    // let checkedLink = req.body.newLink;
    // if (!checkedLink.includes('//')) {
    //   checkedLink = 'https://'.concat(checkedLink);
    // }
    res.send(checkedLink);
  })
});

// app.delete('/delete', (req, res) => {
//   let pathToFile = path.join(__dirname, '../public/images/' + req.body.fileName + '.png');
//   console.log('PATH TO FILE DELETE---', pathToFile)

//   del([pathToFile], function(err, deleted) {
//     if (err) throw err;
//     // deleted files
//     console.log('file that was deleted---', deleted);
//     res.send(200)
//   });


// });


app.listen(port, () => {
  console.log('Listening on port: ', port);
});