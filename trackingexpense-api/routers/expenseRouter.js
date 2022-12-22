const express = require('express')
const Router = express.Router()

// Import All Controller
const {expenseController} = require('./../controllers') // Akan otomatis mengambil file index.js nya
Router.post('/create', expenseController.createExpense)
Router.delete('/delete/:id', expenseController.deleteExpense)

module.exports = Router