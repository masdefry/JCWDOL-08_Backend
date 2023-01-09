const db = require('../connection/conn')
const util = require('util')
const query = util.promisify(db.query).bind(db)

module.exports = {
    create: async(req, res) => {
        try {
            // Step-1 Mengambil data dari req.body
            let {todo, date, description} = req.body

            // Step-2 Simpan kedalam database
            await query(`INSERT INTO todolists(todo, date, description) VALUE ('${todo}', '${date}', '${description}')`)

            // Step-3 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Create Todo Success', 
                data: null
            })
        } catch (error) {
            res.status(404).send({
                isError: false, 
                message: error.message, 
                data: null
            })
        }
    }, 

    update: async(req, res) => {
        try {
            // Step-1 Ambil id dari data yang ingin di update
            let {id} = req.params

            // Step-2 Ambil data yang akan di update
            let {todo, date, description} = req.body 

            // Step-3 Update data yang ada di dalam database
            await query(`UPDATE todolists SET todo='${todo}', date='${date}', description='${description}'
                         WHERE id = ${id}
                        `)

            // Step-4 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Update Todo Success', 
                data: null
            })
        } catch (error) {
            res.status(404).send({
                isError: false, 
                message: error.message, 
                data: null
            })
        }
    }
}