//
//
const HoldingStudi = require('../model/HoldingStudi')


const find_all = async (req, res) => {
    try {
        const obj = await HoldingStudi.find().sort({ createdAt: 1 })
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
        const obj = await HoldingStudi.find().sort({ createdAt: 1 }).select('_id name')
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
