const fs = require('fs') // File system

module.exports = {
    searchBy: (req, res) => {
        // Step-1 Ambil value dari request query
        let data = req.query
        
        for(let key in data){
            data[key] = data[key].replace(/%/g, ' ')
        }

        // Step-2 Ambil data dari db.json
        let {movies} = JSON.parse(fs.readFileSync('./db/db.json')) // with You, Garuda di Dadaku

        // Step-3 Filtering pencarian datanya
        if(data.status){ // with You
            movies = movies.filter(value => {
                return value.status.toLowerCase() === data.status.toLowerCase()
            })
        }

        if(data.location){ // with You
            movies = movies.filter(value => {
                return value.location.toLowerCase() === data.location.toLowerCase()
            })
        }

        if(data.time){ // with You
            movies = movies.filter(value => {
                return value.time.toLowerCase() === data.time.toLowerCase()
            })
        }
       
        // Step-4 Kirim respon
        res.status(201).send({
            isError: false, 
            message: 'Register Success',
            data: movies
        })
    }
}