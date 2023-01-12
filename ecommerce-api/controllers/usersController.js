const db = require('../connection/conn')
const util = require('util')
const query = util.promisify(db.query).bind(db)

module.exports = {
    register: async(req, res) => {
        try {
            // Step-1 Ambil data dari client (req.body)
            let {username, email, password} = req.body

            // Step-2 Check, apakah username or email already register?
            let getUsernameOrEmail = await query(`SELECT * FROM users WHERE username='${username}' OR email='${email}'`)

            // Step-3 Apabila username or email already register, kirim response error
            if(getUsernameOrEmail.length) return res.status(404).send({
                isError: true, 
                message: 'Username or Email Already Register', 
                data: null
            })

            // Step-4 Apabila belum, simpan datanya ke dalam database
            await query(`INSERT INTO users(username, email, password) VALUES ('${username}','${email}', '${password}')`)

            // Step-5 Kirim response success
            res.status(201).send({
                isError: false, 
                message: 'Register Success', 
                data: null
            })
        } catch (error) {
            console.log(error)
        }
    },

    login: async(req, res) => {
        try {
            // Step-1 Ambil data dari client (req.body)
            let {username, password} = req.body

            // Step-2 Check username & password, apakah ada di dalam database
            let getUsernameAndEmail = await query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`)

            // Step-3 Apabila datanya tidak ada di dalam database, maka kirim response error
            if(getUsernameAndEmail.length !== 1) return res.status(404).send({
                isError: true, 
                message: 'Username and Password Not Valid',
                data: null
            })

            // Step-4 Apabila datanya ada di dalam database, maka kirim response success
            res.status(201).send({
                isError: false, 
                message: 'Login Success',
                data: getUsernameAndEmail
            })
        } catch (error) {
            console.log(error)
        }
    },

    transactions: async(req, res) => {
        try {
            // Ambil data dari client (req.body)
            let {total_price, users_id, variant} = req.body
            console.log(total_price)
            console.log(variant)

            // Kirim data ke tb. transactions
            let insertTransactions = await query(`INSERT INTO transactions(total_price, users_id) VALUES ('${total_price}', '${users_id}')`)
            
            // Kirim data ke tb.transactions_details
            await query(`INSERT INTO transactions_detail SET ?`, {name: variant[0].name, variant: variant[0].variant, qty: variant[0].qty, total_price: variant[0].total_price_item, topping: variant[0].topping, sugar: variant[0].sugar, transactions_id: insertTransactions.insertId})

            // Set event scheduler (Kebutuhan expired transaction)
            await query(`CREATE EVENT change_status_transactions_${insertTransactions.insertId} 
            ON SCHEDULE AT DATE_ADD(NOW(), INTERVAL 1 MINUTE)
            DO
                UPDATE transactions SET status = 'Expired'
                WHERE id = ?;`, insertTransactions.insertId)

            // Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Create Transactions Success', 
                data: null
            })
        } catch (error) {
            console.log(error)
        }
    }
}