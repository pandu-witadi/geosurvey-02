//
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const raw = {
    LABEL: String,
    WK: String,
    KKKS: String,
    STATUS_WK: String,
    HOLDING: String,
    TIPE_KONTRAK: String,
    STATUS_USULAN_PROGRAM: String,
    JENIS_KEGIATAN: String,
    NAMA_KEGIATAN: String,
    STATUS_BUNDLING: String,
    NO_AFE: String,
    NILAI_AFE: Number,
    NILAI_INVESTASI: Number,
    STATUS_PERSETUJUAN_TEKNIS: String,
    JENIS_KOMITMEN: String,
    AREA_KEGIATAN: String,
    RENCANA_TOTAL_KUANTITAS_PEKERJAAN: String,
    RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB: String,
    RENCANA_WAKTU_MULAI: String,
    RENCANA_WAKTU_SELESAI: String,
    STATUS_AFE_ONLINE: String,
    REGION_SKK: String,
    PROVINSI: String,
    REALISASI_STATUS_PELAKSANAAN: String,
    REALISASI_WAKTU_MULAI: String,
    REALISASI_WAKTU_SELESAI: String,
    OUTLOOK_KEGIATAN: String,
    REALISASI_KUANTITAS_PEKERJAAN_TAHUN_SEBELUMNYA: String,
    REALISASI_KUANTITAS_PEKERJAAN: String,
    P_REALISASI_KEGIATAN_TOTAL_AKUISISI: String,
    P_REALISASI_KEGIATAN_TOTAL_WPNB: String,
    REALISASI_BIAYA_AFE: Number,
    P_REALISASI_BIAYA_AFE: Number,
    JUMLAH_SHOT_POINT: String,
    OBJEKTIF: String,
    LINTASAN_MELALUI_SUMUR: String,
    NAMA_PNL: String,
    PROSPECT: String,
    LEAD: String,
    STATUS_RESOURCE_LAINNYA: String,
    PLAY: String,
    RR_P50_OIL_MMBOE: Number,
    RR_P50_GAS_BSCF: Number,
    RR_TOTAL_P50_MMBOE: Number,
    FULL_FOLD: String,
    FULL_FOLD_COVERAGE: String,
    P_WPNB_WP_AFE_TEKNIS: String,
    P_VALIDASI_PARAMETER_DESAIN: String,
    P_PENGADAAN_BARANG_JASA: String,
    P_IZIN_UKL_UPL: String,
    P_IZIN_PEMBERITAHUAN_PELAKSANAAN: String,
    P_IZIN_OPEN_AREA: String,
    P_IZIN_K3S_LAINNYA: String,
    P_IZIN_PELEDAK: String,
    P_IZIN_PPKH: String,
    P_SECURITY_CLEARANCE: String,
    P_LIASON_OFFICE: String,
    P_PPKA: String,
    P_SERTIFIKAT_KEAHLIAN: String,
    P_PROJECT_SUMMARY_MOM_SOW: String,
    P_SOSIALISASI: String,
    P_IZIN_HELLDECK: String,
    P_MAKLUMAT_PELAYARAN: String,
    P_BERITA_PELAUT_INDONESIA: String
}


const info = {
    FORM_ID: String,
    TAHUN: Number,
    NAMA_KEGIATAN: String,
    WK: String,
    KKKS: String,
    STATUS_WK: String,
    HOLDING: String,
    STATUS_USULAN_PROGRAM: String,
    JENIS_KEGIATAN: String,
    JENIS_KOMITMEN: String,
    JENIS_TAHAPAN_KEGIATAN: String,
    LABEL: String,
    AREA_KEGIATAN: String,
    STATUS_PERSETUJUAN_TEKNIS: String,
    TIPE_KONTRAK: String,
    STATUS_BUNDLING: String,
    NO_AFE: String,
    NILAI_AFE: Number,
    NILAI_INVESTASI: Number,
    REALISASI_BIAYA_AFE: Number,
    STATUS_AFE_ONLINE: String,
    RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB: Number,

    RENCANA_WAKTU_MULAI: Date,
    RENCANA_WAKTU_SELESAI: Date,

    REALISASI_WAKTU_MULAI: Date,
    REALISASI_WAKTU_SELESAI: Date,

    TOTAL_ACTUAL_COST: Number,
    STATUS_KEGIATAN: String,

    REALISASI_KUANTITAS_PEKERJAAN: Number,
    REALISASI_STATUS_PELAKSANAAN: String,

    PANJANG_LUAS: Number,
    TOTAL_RESOURCE: Number,

    REGION_SKK: String,
    PROVINSI: String,
    OBJEKTIF: String,
    LINTASAN_MELALUI_SUMUR: String,
    NAMA_STRUKTUR_PNL: String,
    PROSPECT: String,
    LEAD: String,
    STATUS_RESOURCE_LAINNYA: String,
    PLAY: String,
    RR_P50_OIL_MMBOE: Number,
    RR_P50_GAS_BSCF: Number,
    RR_TOTAL_P50_MMBOE: Number,
    FULL_FOLD: String,
    NEAR_OFFSET_M: String,
    FAR_OFFSET_M: String,
    SHOT_POINT_INTERVAL_M: String,
    RECEIVER_LINE_INTERVAL_M: String,
    JUMLAH_SHOT_POINT_ESTIMATED: String,
    SAMPLING_RATE_MS: Number,
    RECORD_LENGTH_S: Number,
    PANJANG_STREAMER: String,
    X_LONGITUDE: Number,
    Y_LATITUDE: Number,


}


const calc = {
    TOTAL_INVESTASI: Number,
    TOTAL_RESOURCE: Number,
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
        calc: calc,
        // gantt:[],
        raw: raw,
    },
    {
        timestamps: true,
        strict: false,
        collection: 'Kegiatan',
    }
)


module.exports = mongoose.model('Kegiatan', objSchema)
