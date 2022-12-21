const fs = require('fs') // File system

module.exports = {
    register: async(req, res) => {
        // Step-1 Ngambil value dari request
        // Step-2 Value dari request disimpan ke dalam db.json
        // Step-3 Kirim response
        try {
            // Step-1
            let data = req.body

            let uid = Date.now()

            // Step-1.2
            if(req.body.username.length < 5) return res.status(404).send({
                isError: true, 
                message: 'Username must be more than 5 character',
                data: null
            })
            
            // Step-2
            let getData = JSON.parse(fs.readFileSync('./db/db.json'))
            getData.users.push({uid, ...data})
            fs.writeFileSync('./db/db.json', JSON.stringify(getData))
            
            // Step-3
            res.status(201).send({
                isError: false, 
                message: 'Register Success',
                data: {
                    uid,
                    username: req.body.username, 
                    email: req.body.email
                }
            })
        } catch (error) {
            
        }
    },

    login: async(req, res) => {
        try {
            // Step-1 Ambil value dari request
            let {username, password} = req.query

            // Step-2 Ambil data dari db.json
            let {users} = JSON.parse(fs.readFileSync('./db/db.json'))
           
            // Step-3 Filtering data, kita cocokan username dan password dari request dengan username & password
            //        yang ada di db.json
            let dataToSend = []
            users.forEach(value => {
                if(value.username === username && value.password === password) return dataToSend.push(value)
            })

            if(dataToSend.length === 0) return res.status(401).send({
                isError: false, 
                message: 'Login Failed',
                data: null
            })

            // Step-4 Response
            res.status(201).send({
                isError: false, 
                message: 'Login Success',
                data: {
                    uid: dataToSend[0].uid,
                    username: dataToSend[0].username, 
                    email: dataToSend[0].email, 
                    role: dataToSend[0].role
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}