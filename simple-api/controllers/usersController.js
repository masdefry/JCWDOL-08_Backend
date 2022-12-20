const fs = require('fs') // File system

module.exports = {
    getUsers: (req, res) => {
        // Step-1 Ambil data dari db.json
        let {users} = JSON.parse(fs.readFileSync('./db/db.json'))
        console.log(users)
        // Step-2 Kirim datanya menuju ke client
        res.status(201).send({
            isError: false, 
            message: 'Get Data Success',
            data: users
        })
    },

    postUsers: (req, res) => {
        // Step-1 Ambil data dari client
        let data = req.body

        // Step-2 Simpan data client ke dalam db.json
        let getData = JSON.parse(fs.readFileSync('./db/db.json'))

        getData.users.push(data)

        fs.writeFileSync('./db/db.json', JSON.stringify(getData))

        // Step-3 Kirim response
        res.status(201).send({
            isError: false, 
            message: 'Get Data Success',
            data: JSON.parse(fs.readFileSync('./db/db.json'))
        })
    }
}