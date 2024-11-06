//
//
const Kegiatan = require('../model/Kegiatan')


const find_all = async (req, res) => {
    try {
        const obj = await Kegiatan.find().sort({ createdAt: 1 })
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
        const obj = await Kegiatan.find().sort({ createdAt: 1 }).select('_id name')
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

    let { arr_YEAR, arr_JENIS_KEGIATAN, arr_HOLDING, arr_WK  } = req.body

    let tmp = []

    if (arr_YEAR && arr_YEAR.length > 0)
        tmp.push({ "info.YEAR" : { $in: arr_YEAR } })

    if (arr_JENIS_KEGIATAN && arr_JENIS_KEGIATAN.length > 0)
        tmp.push({ "info.JENIS_KEGIATAN" : { $in: arr_JENIS_KEGIATAN } })

    if (arr_HOLDING && arr_HOLDING.length > 0)
        tmp.push({ "info.HOLDING" : { $in: arr_HOLDING } })

    if (arr_WK && arr_WK.length > 0)
       tmp.push({ "info.WK" : { $in: arr_WK } })


    let criteria = {}
    if (tmp.length > 0)
        criteria = { $and: tmp }



    try {
        const obj = await Kegiatan.find(criteria)
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

const find_by_id = async (req, res) => {

    const { kegiatanId } = req.params

    if (!kegiatanId)
        return res.status(200).json({
            isSuccess: false,
            message: "kegiatanId not available"
        })

    try {
        const obj = await Kegiatan.findById(kegiatanId)
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
    find_by_select,
    find_by_id
}
