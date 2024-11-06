//
//
const GeoSpatialWK = require('../model/GeoSpatialWK')


const info_select_project = async (req, res) => {

    let { arr_YEAR, arr_JENIS_KEGIATAN, arr_HOLDING, arr_WK  } = req.body

    let tmp = []

    // if (arr_YEAR && arr_YEAR.length > 0)
    //     tmp.push({ "info.YEAR" : { $in: arr_YEAR } })

    // if (arr_JENIS_KEGIATAN && arr_JENIS_KEGIATAN.length > 0)
        // tmp.push({ "properties.JENIS_KEGIATAN" : { $in: arr_JENIS_KEGIATAN } })

    if (arr_HOLDING && arr_HOLDING.length > 0)
        tmp.push({ "properties.HOLDING" : { $in: arr_HOLDING } })

    // if (arr_WK && arr_WK.length > 0)
            // tmp.push({ "properties.WK" : { $in: arr_WK } })


    let criteria = {}
    if (tmp.length > 0)
        criteria = { $and: tmp }

    let arr  = await GeoSpatialWK.find(criteria).lean()

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
