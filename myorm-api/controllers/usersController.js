// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('./../models/index')
const users = db.users
const users_address = db.users_address

// Import hashing
const {hashPassword, hashMatch} = require('./../lib/hash')

// Import jwt
const {createToken} = require('./../lib/jwt')

module.exports = {
    register: async(req, res) => {
        const t = await sequelize.transaction() 
        
    }
}   