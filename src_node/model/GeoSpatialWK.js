//
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const properties = {
    LABEL: String,
    LONG_X: Number,
    LAT_Y: Number,
    WK: String,
    KKKS: String,
    STATUS: String,
    TGL_EFEKTIF: String,
    FASE: String,
    JENIS: String,
    LOKASI: String,
    BASIN_128: String,
    PRODUKSI: String,
    REGION: String,

    HOLDING: String,
    AREA: String,
    PERWAKILAN: String,
    NGI_REGION: String,
    
}


const geometry = {
    'type': String,
    coordinates: [ Number ]
}

const objSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        parent: {},
        'type':  String ,
        active: {
            type: Boolean,
            default: true
        },
        properties: properties,
        geometry: geometry
    },
    {
        timestamps: true,
        collection: 'GeoSpatialWK',
        strict: false
    }
)


module.exports = mongoose.model('GeoSpatialWK', objSchema)
