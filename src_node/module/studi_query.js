//
//
const Studi = require('../model/Studi')


const find_all = async (req, res) => {
    try {
        const obj = await Studi.find().sort({ createdAt: 1 })
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
        const obj = await Studi.find().sort({ createdAt: 1 }).select('_id name')
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

const find_by_select = async (req, res) => {

    let { arr_TAHUN, arr_TIPE_STUDI, arr_HOLDING, arr_WK  } = req.body

    let tmp = []

    if (arr_TAHUN && arr_TAHUN.length > 0)
        tmp.push({ "info.TAHUN" : { $in: arr_TAHUN } })

    if (arr_TIPE_STUDI && arr_TIPE_STUDI.length > 0)
            tmp.push({ "info.TIPE_STUDI" : { $in: arr_TIPE_STUDI } })

    if (arr_HOLDING && arr_HOLDING.length > 0)
        tmp.push({ "info.HOLDING" : { $in: arr_HOLDING } })

    if (arr_WK && arr_WK.length > 0)
            tmp.push({ "info.WK" : { $in: arr_WK } })


    let criteria = {}
    if (tmp.length > 0)
        criteria = { $and: tmp }



    try {
        const obj = await Studi.find(criteria)
        // .select('_id name info.YEAR info.JENIS_KEGIATAN info.HOLDING info.WK')
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
    find_by_select
}
