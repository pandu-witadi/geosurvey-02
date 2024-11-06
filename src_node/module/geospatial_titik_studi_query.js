//
//
const GeoSpatialTitikStudi = require('../model/GeoSpatialTitikStudi')


const info_select_project = async (req, res) => {


    let { arr_TIPE_STUDI, arr_HOLDING, arr_WK  } = req.body

    let tmp = []

    if (arr_TIPE_STUDI && arr_TIPE_STUDI.length > 0)
        tmp.push({ "properties.TIPE_STUDI" : { $in: arr_TIPE_STUDI } })

    if (arr_HOLDING && arr_HOLDING.length > 0)
        tmp.push({ "properties.HOLDING" : { $in: arr_HOLDING } })

    if (arr_WK && arr_WK.length > 0)
            tmp.push({ "properties.WK" : { $in: arr_WK } })


    let criteria = {}
    if (tmp.length > 0)
        criteria = { $and: tmp }

    let arr  = await GeoSpatialTitikStudi.find(criteria).lean()

    let tepl = null
    let features = []
    if (arr && arr.length >= 0) {
        let { parent, ...otherKeys } = arr[0]
        tepl = { ...parent }
        console.log(tepl)
        for (let i=0; i<arr.length; i++) {
            let { parent, ...otherKeys } = arr[i]
            features.push({...otherKeys})
        }
        tepl['features'] = features
    }



    return res.status(200).json(tepl)
}


// -----------------------------------------------------------------------------
module.exports = {
    info_select_project
}
