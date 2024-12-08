//
//
const path = require('path')
const CF = require('../conf/conf_app')
const { createRandomId } = require('../util/random')
const {
    checkDirectoryExists,
    createDirectory,
    cleanFileName,
    moveFileToPath,
    deleteStringFromArray
} = require('../util/file')

const Kegiatan = require('../model/Kegiatan')



const create_randomId = async (req, res) => {
    let isDirectoryExists = true
    let randomId = ""
    let directoryPath = ""

    while (isDirectoryExists) {
        randomId = createRandomId({totalChar: 2, totalDigit: 5})
        // console.log(randomId)

        // check of course id is unique or not
        try {
            directoryPath = path.join(__dirname, "..", CF.path.kegiatan, randomId)
            isDirectoryExists = await checkDirectoryExists(directoryPath)
            if ( !isDirectoryExists ) {
                console.log(directoryPath)
                createDirectory(directoryPath)
                break
            }
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                error: error.message,
                message: 'Error while creating random ID'
            })
        }
    }

    return res.status(200).json({
        isSuccess: true,
        path: directoryPath,
        data: randomId
    })
}


const upload_file_kegiatan_thumbnail  = async (req, res) => {
    let { randomId } = req.body

    // check key randomId
    if (!randomId) {
        return res.status(200).json({
            isSuccess: false,
            message: "randomId not exist"
        })
    }

    // check directory
    let directoryPath = path.join(__dirname, "..", CF.path.kegiatan, randomId)
    let isDirectoryExists = await checkDirectoryExists(directoryPath)
    if ( !isDirectoryExists ) {
        createDirectory(directoryPath)
        console.log('... create directory: ' + directoryPath)
    }

    // check kegiatan obj
    let obj = await Kegiatan.findOne({ randomId: randomId })
    if (!obj) {
        return res.status(200).json({
            isSuccess: false,
            message: "kegiatan with randomId " + randomId + " not exist"
        })
    }

    let tmp_file = req.files?.thumbnail
    let tmp_file_name = ""

    if (tmp_file) {
         tmp_file_name = cleanFileName(tmp_file.name)

         if ( obj.fileUpload.thumbnail.includes(tmp_file_name) ) {
             return res.status(200).json({
                 isSuccess: false,
                 message: "file " + tmp_file_name + " already exist"
             })
         } else {
             moveFileToPath( path.join(directoryPath, tmp_file_name), tmp_file)
             obj.fileUpload.thumbnail.push(tmp_file_name)
             await obj.save()

             return res.status(200).json({
                 isSuccess: true,
                 path: directoryPath,
                 randomId: randomId,
                 tmp_file_name: tmp_file_name,
                 data: obj
             })
         }
    } else {
        return res.status(200).json({
            isSuccess: false,
            message: "file error"
        })
    }
}


const delete_file_kegiatan_thumbnail  = async (req, res) => {
    let { randomId, thumbnail } = req.body

    // check key randomId
    if (!randomId || !thumbnail) {
        return res.status(200).json({
            isSuccess: false,
            message: "parameter randomId or thumbnail not exist"
        })
    }

    // check directory
    let directoryPath = path.join(__dirname, "..", CF.path.kegiatan, randomId)
    let isDirectoryExists = await checkDirectoryExists(directoryPath)
    if ( !isDirectoryExists ) {
        return res.status(200).json({
            isSuccess: false,
            message: directoryPath + " not exist"
        })
    }

    // check kegiatan obj
    let obj = await Kegiatan.findOne({ randomId: randomId })
    if (!obj) {
        return res.status(200).json({
            isSuccess: false,
            message: "kegiatan with randomId " + randomId + " not exist"
        })
    }

    let index = obj.fileUpload.thumbnail.indexOf(thumbnail)
    console.log(index, obj.fileUpload.thumbnail)

    if (index > -1) {
        obj.fileUpload.thumbnail.splice(index, 1)
        await obj.save()
        return res.status(200).json({
            isSuccess: true,
            randomId: randomId,
            data: obj
        })
    } else {
        return res.status(200).json({
            isSuccess: false,
            message: "String not found in the array."
        })
    }


}
// -----------------------------------------------------------------------------
module.exports = {
    create_randomId,
    upload_file_kegiatan_thumbnail,
    delete_file_kegiatan_thumbnail

}
