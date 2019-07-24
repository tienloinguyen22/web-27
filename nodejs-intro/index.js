const fs = require('fs');

fs.readFile('./data.txt', {encoding: 'utf8'}, (err, data) => {
  console.log('Error: ', err);
  console.log('Data: ', data);
});

fs.readFile('./data.txt', {encoding: 'utf8'}, (err, data) => {
  console.log('Error: ', err);
  console.log('Data: ', data);
});

// write sth to data.txt
fs.watchFile('./data.txt', (current, previous) => {
  console.log('File changed');
});