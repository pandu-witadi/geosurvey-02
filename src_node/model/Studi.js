//
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const raw = {
    TAHUN: Number,
    LABEL: String,
    KKKS: String,
    HOLDING: String,
    WK: String,
    STATUS_WK: String,
    TIPE_KONTRAK: String,
    BASIN: String,
    NAMA_STUDI: String,

    NAMA_STRUKTUR_PROSPECT_LEAD: String,
    PROSPECT_AND_UNDEVELOPED: String,
    LEAD: String,

    RR_MMBOE: Number,
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
    Y_LATITUDE: Number
}


const info = {
    TAHUN: Number,
    LABEL: String,
    KKKS: String,
    HOLDING: String,
    WK: String,
    STATUS_WK: String,

    NAMA_STUDI: String,
    TIPE_STUDI: String,
    BASIN: String,

    RENCANA_WAKTU_MULAI: Date,
    RENCANA_WAKTU_SELESAI: Date,
    REALISASI_WAKTU_MULAI: Date,
    REALISASI_WAKTU_SELESAI: Date,
    REALISASI_STATUS_PELAKSANAAN: String,

    RENCANA_ANGGARAN_AFE_INVESTASI: Number,
    REALISASI_ANGGARAN_AFE_INVESTASI: Number,

    RR_MMBOE: Number,
    RR_MMBOE_INPLACE: Number,

    X_LONGITUDE: Number,
    Y_LATITUDE: Number
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
        // gantt:[],
        raw: raw,
    },
    {
        timestamps: true,
        strict: false,
        collection: 'Studi'
    }
)


module.exports = mongoose.model('Studi', objSchema)
