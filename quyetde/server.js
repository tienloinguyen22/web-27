const express = require('express');
const path = require('path');

const app = express();

// public folder
app.use(express.static('public'));

// method + address
// get/post/put/delete
app.get('/', (req, res) => {
  res.send('Hello world');
});

// dirname: current working folder
app.get('/ask', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/ask.html'));
});

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server listen on port 3000 ...');
  }
});