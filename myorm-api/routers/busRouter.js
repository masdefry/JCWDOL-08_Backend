const express = require('express')
const Router = express.Router()

// Import All Controller
const {busController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/search', busController.search)

module.exports = Router