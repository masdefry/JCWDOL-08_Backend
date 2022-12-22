const fs = require('fs')

module.exports = {
    createExpense: (req, res) => {
        try {
            // Step-1 Mengambil dari request client (req.body)
            let reqBody = req.body

            // Step-2 Ambil data dari db.json
            let getData = JSON.parse(fs.readFileSync('./db/db.json'))

            // Step-3 Manipulasi data
            let generateId = getData.expenses[getData.expenses.length-1].id + 1
            let dataToSave = { id: generateId, ...reqBody }
            getData.expenses.push(dataToSave)

            // Step-4 Simpan data ke db.json
            fs.writeFileSync('./db/db.json', JSON.stringify(getData))

            // Step-5 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Create Expense Success', 
                data: getData.expenses
            })
        } catch (error) {
            console.log(error)
        }
    },

    deleteExpense: (req, res) => {
        try {
            // Step-1 Ambil value id dari req.params /expense/delete/1
            let {id} = req.params

            // Step-2 Ambil data dari db.json
            let getData = JSON.parse(fs.readFileSync('./db/db.json'))

            // Step-3 Manipulasi data, kita hapus data yang sesuai dengan id dari req.params
            getData.expenses = getData.expenses.filter(value => {
                return value.id !== parseInt(id)
            })

            // Step-4 Simpan data terbaru nya ke dalam db.json
            fs.writeFileSync('./db/db.json', JSON.stringify(getData))

            // Step-5 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Delete Expense Success', 
                data: getData.expenses
            })
        } catch (error) {
            
        }
    }
}