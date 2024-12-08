//
//
const WKKegiatan = require('../model/WKKegiatan')
const KegiatanKKKSWKHolding = require('../model/KegiatanKKKSWKHolding')



const find_all = async (req, res) => {
    let tmp = []
    // let tmp = [{ "active": true }]

    if (req.user && req.user.role == "contractor") {
        tmp.push({ "name" : req.user.WK })
    }

    let criteria = {}
    if (tmp.length > 0)
        criteria = { $and: tmp }

    // console.log(tmp)

    try {
        const obj = await WKKegiatan.find(criteria).sort({ createdAt: 1 })
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

const find_all_summary = async (req, res) => {

    try {
        const obj = await WKKegiatan.find().sort({ createdAt: 1 }).select('_id name')
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


const find_full = async (req, res) => {
    let tmp = []
    // let tmp = [{ "active": true }]

    if (req.user && req.user.role == "contractor") {
        tmp.push({ "WK" : req.user.WK })
    }

    let criteria = {}
    if (tmp.length > 0)
        criteria = { $and: tmp }

    console.log(tmp)

    try {
        const obj = await KegiatanKKKSWKHolding.find(criteria).sort({ createdAt: 1 })
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
    find_all,
    find_all_summary,
    find_full
}
