// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// To generate UID
const { v4: uuidv4 } = require('uuid');

// Import models
const db = require('./../models/index')
const users = db.users
const users_address = db.users_address

module.exports = {
    register: async(req, res) => {
        
    }
}   