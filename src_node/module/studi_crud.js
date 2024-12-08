//
//
const path = require('path')

const CF = require('../conf/conf_app')
const Studi = require('../model/Studi')
const { createRandomId } = require('../util/random')
const { checkDirectoryExists, createDirectory } = require('../util/file')


// --- create ---
const create = async (req, res) => {
    let { NAMA_STUDI, ...otherKeys } =  req.body

    if (!NAMA_STUDI) {
        return res.status(200).json({
            isSuccess: false,
            message: "NAMA_STUDI not exist"
        })
    }

    let objExst = await Studi.findOne({ name: NAMA_STUDI })
    if (objExst) {
        return res.status(200).json({
            isSuccess: false,
            message: "NAMA_STUDI already registered"
        })
    }

    try {
        // create directory
        let isDirectoryExists = true
        let randomId = ""
        let directoryPath = ""

        while (isDirectoryExists) {
            randomId = createRandomId({totalChar: 2, totalDigit: 5})
            // console.log(randomId)

            // check of course id is unique or not
            try {
                directoryPath = path.join(__dirname, "..", CF.path.studi, randomId)
                isDirectoryExists = await checkDirectoryExists(directoryPath)
                if ( !isDirectoryExists ) {
                    createDirectory(directoryPath)
                    console.log('... create directory: ' + directoryPath)
                }
            } catch (error) {}
        }

        const obj = new Studi({
            name: NAMA_STUDI,
            active: true,
            randomId: randomId,
            info: req.body
        })
        let studi = await obj.save()
        return res.status(201).json({
            isSuccess:  !!studi,
            data: studi
        })
    } catch (error) {
        return res.status(400).json({
            isSuccess: false,
            message: error.message
        })
    }

    return req.body
}


// --- read ---
const readById = async ( req, res) => {
    let { studiId } = req.params
    if (!studiId)
        return res.status(200).json({
            isSuccess: false,
            message: "studiId not available"
        })

    try {
        let obj = await Studi.findById(studiId)

        return res.status(200).json({
            isSuccess: true,
            data: obj
        })

    } catch (error) {
        return res.status(200).json({
            isSuccess: false,
            message: error.message
        })
    }
}

// --- update ---
const update = async ( req, res) => {
    let { studiId } = req.params
    // console.log("PUT " + kegiatanId)

    let update_info = {}
    for (const key of Object.keys(req.body)) {
        if (req.body[key] !== '') {
            update_info['info.' + key] = req.body[key]
            if (key === "NAMA_STUDI") {
                update_info[key] = req.body[key]
            }
        }
    }

    console.log(update_info)
    try {
        let filter =  { _id: studiId }
        let obj = await Studi.findOneAndUpdate(filter, { $set: update_info }  )
        // console.log(kegiatan)
        obj = await Studi.findById(studiId)

        return res.status(200).json({
            isSuccess: true,
            data: obj
        })

    } catch (error) {
        return res.status(200).json({
            isSuccess: false,
            message: error.message
        })
    }
}


// --- read ---
const deleteById = async ( req, res) => {
    let { studiId } = req.params
    try {
        let obj = await Studi.findById(studiId)
        if (obj) {
            await obj.deleteOne()
        }
        return res.status(200).json({
            isSuccess: true,
            data: obj
        })

    } catch (error) {
        return res.status(200).json({
            isSuccess: false,
            message: error.message
        })
    }
}




// -----------------------------------------------------------------------------
module.exports = {
    create,
    update,
    readById,
    deleteById
}
