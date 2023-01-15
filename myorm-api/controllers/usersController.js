// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('./../models/index')
const users = db.users
const users_address = db.users_address

module.exports = {
    register: async(req, res) => {
        const t = await sequelize.transaction() 
        try {
            // Step-1 Ambil data dari client (req.body)
            let {username, email, password, recipient, phone_number, address,
            city, province, postal_code} = req.body

            // Step-2 Validasi
            // ... 

            // Step-3 Insert data ke users
            let insertToUsers = await users.create({username, email, password}, {transaction: t})
            let users_id = insertToUsers.dataValues.id

            // Step-4 Insert data ke users_address (membutuhkan id users)
            await users_address.create({recipient, phone_number, address, city, province, postal_code, users_id}, {transaction: t})

            // Step-5 Kirim response
            await t.commit()
            res.status(201).send({
                isError: false, 
                message: 'Register Success', 
                data: null
            })
        } catch (error) {
            await t.rollback()
            res.status(404).send({
                isError: true, 
                message: error.message, 
                data: null
            })
        }
    }
}   