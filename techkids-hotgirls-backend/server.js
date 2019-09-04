const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const usersRouter = require('./users/users.routes');

mongoose.connect('mongodb://localhost:27017/techkids-hotgirls', {useNewUrlParser: true}, (error) => {
  if (error) {
    throw error;
  } else {
    console.log('Connect to mongodb success');
    const server = express();

    // midlewares
    server.use(bodyParser.json());
    server.use(expressSession({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    }));

    // routers
    server.use('/users', usersRouter);

    server.listen(3001, (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Server listen on port 3001 ...');
      }
    });
  }
});