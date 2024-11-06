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
    NAMA_KEGIATAN: String,
    HOLDING: String,
    JENIS_KEGIATAN: String,
    REALISASI_STATUS_PELAKSANAAN: String
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
        collection: 'GeoSpatialTitiKKegiatan',
        strict: false
    }
)


module.exports = mongoose.model('GeoSpatialTitiKKegiatan', objSchema)
