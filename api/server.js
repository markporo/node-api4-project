// - [ ] Deploy your app to [Heroku](https://heroku.com). The link to the deployed API is your submission deliverable

// requires/imports
const express = require('express');
const server = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/users-router');
const { logger } = require("./middleware/middleware");

//third party middleware
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());

// custom middleware
server.use(logger);

//connect routes
server.use('/users', usersRouter);

// home page
server.get('/', (req, res) => {
    res.send('HEY EVERYBODY TIME TO LOGIN TO HEROKU!');
})



module.exports = server;