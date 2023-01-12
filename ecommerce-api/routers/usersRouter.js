const express = require('express')
const Router = express.Router()

// Import Controller
const {usersController} = require('../Controllers');

Router.post('/register', usersController.register);
Router.get('/login', usersController.login);
Router.post('/transactions', usersController.transactions);

module.exports = Router;