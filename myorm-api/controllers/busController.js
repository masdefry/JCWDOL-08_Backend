// Import Sequelize
const { sequelize } = require('./../models')
const { Op } = require('sequelize');

// Import models
const db = require('./../models/index')
const bus = db.bus

// Import hashing
const {hashPassword, hashMatch} = require('./../lib/hash')

// Import jwt
const {createToken} = require('./../lib/jwt')

module.exports = {
    search: async(req, res) => {
        try {
            let {schedule_date, from, to} = req.query

            let findBus = await sequelize.query(`
            SELECT b.id, b.name, br.from, br.to, br.price, br.total_seat, br.total_seat - COUNT(td.id) AS total_seat_available FROM transactions t 
            JOIN transaction_details td ON td.transactions_id = t.id
            RIGHT JOIN buses b ON (b.id = t.bus_id AND (t.schedule_date = ? OR t.schedule_date IS NULL))
            JOIN bus_rutes br ON br.bus_id = b.id
            WHERE br.from = ? AND br.to = ?
            GROUP BY b.id;
            `, {
                replacements: [schedule_date, from, to], 
                type: sequelize.QueryTypes.SELECT
            })

            res.status(200).send({
                isError: false, 
                message: 'Search Bus Success', 
                data: findBus
            })
        } catch (error) {
            console.log(error)            
        }
    }
}   