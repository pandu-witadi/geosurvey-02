//
//
// const GeoSpatialTitikKegiatan = require('../model/GeoSpatialTitikKegiatan')
const Kegiatan = require('../model/Kegiatan')


const info_select_project = async (req, res) => {

    let { arr_YEAR, arr_JENIS_KEGIATAN, arr_HOLDING, arr_WK  } = req.body

    let tmp = []

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
        let tmp = []
        let arr  = await Kegiatan.find(criteria).lean().select("_id info.LABEL info.X_LONGITUDE info.Y_LATITUDE info.WK info.KKKS info.NAMA_KEGIATAN info.HOLDING info.JENIS_KEGIATAN info.REALISASI_STATUS_PELAKSANAAN info.REALISASI_WAKTU_MULAI")

        for (let i=0; i<arr.length; i++) {
            tmp.push({
                _id: arr[i]['_id'],
                ...arr[i]['info']
            })
        }

        return res.status(200).json({
            isSuccess: true,
            data: tmp,
        })
    } catch (error) {
        return res.status(200).json({
            isSuccess: false,
            message: error.message
        })
    }


    return res.status(200).json(tepl)
}


// -----------------------------------------------------------------------------
module.exports = {
    info_select_project
}
