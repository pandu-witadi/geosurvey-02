//
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const info = {
    TAHUN: Number,
    LABEL: String,
    KKKS: String,
    HOLDING: String,
    WK: String,
    STATUS_WK: String,

    TIPE_KONTRAK: String,
    BASIN: String,
    REGION: String,
    NAMA_STUDI: String,
    STRUCTURE_NAME: String,

    PROSPECT: String,
    LEAD: String,
    UNDEVELOPED: String,
    RR_PROSPECT: Number,
    RR_LEAD: Number,
    RR_UNDEVELOPED: Number,
    RR_MMBOE_TOTAL: Number,
    RR_MMBOE_INPLACE: Number,

    TIPE_AFE: String,
    NO_AFE: String,
    STATUS_USULAN_KEGIATAN: String,
    JENIS_KOMITMEN: String,

    RENCANA_WAKTU_MULAI: Date,
    RENCANA_WAKTU_SELESAI: Date,
    RENCANA_ANGGARAN_AFE_INVESTASI: Number,
    STATUS_WPNB: String,
    KETERANGAN_RENCANA: String,

    TIPE: String,
    TIPE_STUDI: String,
    PIC: String,
    VALIDATOR: String,
    PIC_KKKS: String,

    P_PROGRESS_PELAKSANAAN: Number,
    REALISASI_ANGGARAN_AFE_INVESTASI: Number,
    REALISASI_WAKTU_MULAI: Date,
    REALISASI_WAKTU_SELESAI: Date,
    KETERANGAN_REALISASI: String,

    VENDOR: String,
    REALISASI_STATUS_PELAKSANAAN: String,
    PIC_POKJA_CHECK: String,
    X_LONGITUDE: Number,
    Y_LATITUDE: Number,

    RR_TOTAL_MMBOE: Number
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
        tmp: info,
        randomId: String,
    },
    {
        timestamps: true,
        strict: false,
        collection: 'Studi'
    }
)


module.exports = mongoose.model('Studi', objSchema)
