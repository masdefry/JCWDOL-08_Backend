// Import Multer
const {multerUpload} = require('./../lib/multer')

// Import DeleteFiles
// const deleteFiles = require('./../helpers/deleteFiles')

const uploadImages = (req, res, next) => {
    const multerResult = multerUpload.fields([{name: 'images', maxCount: 3}])
    multerResult(req, res, function (err){
        try { 
            if(err) throw err
            
        } catch (error) {
            res.status(400).send({
                isError: true, 
                message: error.message, 
                data: null
            })
        }
    })
}

module.exports = uploadImages
