//
//
const WKStudi = require('../model/WKStudi')


const find_all = async (req, res) => {
    let tmp = []
    // let tmp = [{ "active": true }]

    if (req.user && req.user.role == "contractor") {
        tmp.push({ "name" : req.user.WK })
    }

    let criteria = {}
    if (tmp.length > 0)
        criteria = { $and: tmp }

    try {
        const obj = await WKStudi.find(criteria).sort({ createdAt: 1 })
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
        const obj = await WKStudi.find().sort({ createdAt: 1 }).select('_id name')
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
    find_all_summary
}
