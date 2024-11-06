//
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const properties = {
    LABEL: String,
    X_LONGITUDE: Number,
    Y_LATITUDE: Number,
    WK: String,
    KKKS: String,
    HOLDING: String,
    NAMA_STUDI: String,
    TIPE_STUDI: String,
    REALISASI_STATUS_PELAKSANAAN: String,
    REALISASI_WAKTU_MULAI: String,
    RR_MBOE: Number
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
        collection: 'GeoSpatialTitiKStudi',
        strict: false
    }
)


module.exports = mongoose.model('GeoSpatialTitiKStudi', objSchema)
