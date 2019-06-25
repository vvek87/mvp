const express = require('express');
const app = express();
const port = 3002;

const webshot = require('webshot');


app.use(express.static(__dirname + '/../public/'));




app.get('/test', (req, res) => {
console.log('test GET in index.js')
  const sites = ['google.com', 'ign.com'];

  for (var i = 0; i < sites.length; i++) {
    webshot(sites[i], 'public/images/' + sites[i].split('.')[0] + '.png', (err) => {
      if (err) {
        console.log('webshot error in index.js: ', err)
      }
    });
  }

  res.send('google');
});


app.listen(port, () => {
  console.log('Listening on port: ', port);
});