//
//
const Studi = require('../model/Studi')



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
        const obj = new Studi({
            name: NAMA_STUDI,
            info: req.body
        })
        let kegiatan = await obj.save()
        return res.status(201).json({
            isSuccess:  !!kegiatan,
            data: kegiatan
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
