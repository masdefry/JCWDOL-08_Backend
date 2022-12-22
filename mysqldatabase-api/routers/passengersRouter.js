const express = require('express')
const Router = express.Router()

// Import Controller
const {passengersController} = require('../Controllers');

Router.get('/get', passengersController.searchByName);
Router.get('/total', passengersController.getTotalSurvived);
Router.get('/total-malefemale-survived', passengersController.getTotalMaleFemaleSurvived);
Router.get('/total-passengers-survived', passengersController.getPassangersSurvivedByClass);

module.exports = Router;