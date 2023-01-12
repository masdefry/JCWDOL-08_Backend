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
    }
}