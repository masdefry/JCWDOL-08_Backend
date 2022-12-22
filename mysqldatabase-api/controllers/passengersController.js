const db = require('../connection/conn')
const util = require('util')
const query = util.promisify(db.query).bind(db)

module.exports = {
    searchByName: async(req, res) => {
        try {
            // Step-1 Ambil value dari req (req.query)
            let {name} = req.query 

            // Step-2 Jalan query SELECT
            let findName = await query(`SELECT * FROM passengers WHERE Name LIKE '%${name}%'`)

            // Step-3 Kirim Response
            res.status(201).send({
                isError: false, 
                message: 'Search By Name Success',
                data: findName
            })
        } catch (error) {
            console.log(error)
        }
    },

    getTotalSurvived: async(req, res) => {
        try {
            // Step-1 Jalankan query SELECT
            let findTotalSurvived = await query(`SELECT COUNT(*) as Total_Passengers_Survived FROM passengers WHERE Survived=1`)

            // Step-2 Kirim response
            res.status(201).send({
                isError: false, 
                message: 'Get Total Survived Success',
                data: findTotalSurvived
            })
        } catch (error) {
            
        }
    },

    getTotalMaleFemaleSurvived: async(req, res) => {
        try {
            let findTotalMaleFemaleSurvived = await query(`SELECT Sex, COUNT(*) as Total_Survived FROM passengers WHERE Survived=1 GROUP BY Sex;`)
            
            res.status(201).send({
                isError: false, 
                message: 'Get Total Survived Success',
                data: findTotalMaleFemaleSurvived
            })
        } catch (error) {
            
        }
    },

    getPassangersSurvivedByClass: async(req, res) => {
        try {
            let {pclass} = req.query 

            let findPassengersSurvived = await query(`SELECT * FROM passengers Where Survived=1 AND Pclass=${pclass}`)

            res.status(201).send({
                isError: false, 
                message: 'Get Passengers Survived Success',
                data: findPassengersSurvived
            })
        } catch (error) {
            console.log(error)
        }
    }
}