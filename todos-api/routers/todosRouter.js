const express = require('express')
const Router = express.Router()

// Import Controller
const {todosController} = require('../Controllers');

Router.post('/create', todosController.create);
Router.patch('/update/:id', todosController.update);

module.exports = Router;