//
//
const mongoose = require('mongoose')

const objSchema = new mongoose.Schema(
    {
        active: {
            type: Boolean,
            default: true
        },
        WK: String,
        HOLDING: String,
        KKKS: String,
        FASE_WK: String,
        JENIS_WK: String,
        STATUS_KEAKTIFAN_WK: String,
        STATUS_PRODUKSI: String,
        JENIS_KONTRAK: String,
        ONS_OFF: String,
        LUAS_WK_AWAL_KM2: Number,
        LUAS_WK_SAAT_INI_KM2: Number,
        TGL_EFEKTIF: Date

    },
    {
        timestamps: true,
        strict: false,
        collection: 'KegiatanKKKSWKHolding'
    }
)


module.exports = mongoose.model('KegiatanKKKSWKHolding', objSchema)
