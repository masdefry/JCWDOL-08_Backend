// Import Multer
const {multerUpload} = require('./../lib/multer')

// Import DeleteFiles
const deleteFiles = require('./../helpers/deleteFiles')

const uploadImages = (req, res, next) => {
    const multerResult = multerUpload.fields([{name: 'images', maxCount: 3}])
    multerResult(req, res, function (err){
        try { 
            if(err) throw err

            req.files.images.forEach(value => {
                if(value.size > 100000){
                    deleteFiles(req.files.images)

                    return res.status(404).send({
                        isError: true, 
                        message: `${value.originalname} size too large`,
                        data: null
                    })
                }
            })

            // next()
            
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
