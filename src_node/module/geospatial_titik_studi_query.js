//
//
// const GeoSpatialTitikStudi = require('../model/GeoSpatialTitikStudi')
const Studi = require('../model/Studi')

const info_select_project = async (req, res) => {


    let { arr_TIPE_STUDI, arr_HOLDING, arr_WK  } = req.body

    let tmp = []
    // let tmp = [{ "active": true }]

    if (req.user && req.user.role == "contractor") {
        tmp.push({ "info.WK" : req.user.WK })
    }

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
        let tmp = []
        let arr  = await Studi.find(criteria).lean().select("_id info.LABEL info.X_LONGITUDE info.Y_LATITUDE info.WK info.KKKS info.NAMA_STUDI info.HOLDING info.TIPE_STUDI info.REALISASI_STATUS_PELAKSANAAN info.REALISASI_WAKTU_MULAI info.RR_MMBOE_TOTAL")
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
