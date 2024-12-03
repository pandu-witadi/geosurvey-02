//
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const info = {
    TAHUN: Number,
    CODE: String,
    NAMA_KEGIATAN: String,
    WK: String,
    KKKS: String,

    JENIS_KEGIATAN: String,
    JENIS_TAHAPAN_KEGIATAN: String,
    AREA_KEGIATAN: String,
    WILAYAH_INDONESIA: String,

    FOLD_COVERAGE: Number,
    KM_KM2_TITIK_LINE: Number,

    NO_AFE: String,
    KETERANGAN: String,

    UNIT_PRICE_ORIGINAL: Number,
    UNIT_PRICE_REVISED: Number,
    
    PREPARATION_ORIGINAL: Number,
    PREPARATION_REVISED: Number,

    MOB_DEMOB_ORIGINAL: Number,
    MOB_DEMOB_REVISED: Number,

    SUPPORT_ORIGINAL: Number,
    SUPPORT_REVISED: Number,

    BIAYA_USULAN: Number,
    BIAYA_DISETUJUI: Number,
}



const objSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        tag: [ String ],
        active: {
            type: Boolean,
            default: true
        },
        info: info,
    },
    {
        timestamps: true,
        strict: false,
        collection: 'AFESurvei',
    }
)


module.exports = mongoose.model('AFESurvei', objSchema)
