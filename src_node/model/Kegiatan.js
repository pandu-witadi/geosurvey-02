//
//
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const info = {
    TAHUN: Number,
    NAMA_KEGIATAN: String,
    WK: String,
    STATUS_WK: String,
    KKKS: String,
    HOLDING: String,
    LABEL: String,

    STATUS_USULAN_PROGRAM: String,
    JENIS_KEGIATAN: String,
    JENIS_KOMITMEN: String,
    JENIS_TAHAPAN_KEGIATAN: String,
    AREA_KEGIATAN: String,

    STATUS_PERSETUJUAN_TEKNIS: String,
    TIPE_KONTRAK: String,
    STATUS_BUNDLING: String,
    NO_AFE: String,
    NILAI_AFE: Number,
    NILAI_INVESTASI: Number,
    STATUS_AFE_ONLINE: String,

    RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB: Number,
    RENCANA_WAKTU_MULAI: Date,
    RENCANA_WAKTU_SELESAI: Date,

    REGION_SKK: String,
    PROVINSI: String,
    KENDALA_OPERASIONAL_LAPANGAN: String,
    REALISASI_STATUS_PELAKSANAAN: String,
    OUTLOOK_KEGIATAN: String,

    REALISASI_WAKTU_MULAI: Date,
    REALISASI_WAKTU_SELESAI: Date,

    REALISASI_KUANTITAS_PEKERJAAN_TAHUN_WPNB: Number,
    P_REALISASI_KEGIATAN_TOTAL_WPNB: Number,
    REALISASI_BIAYA_AFE: Number,
    P_REALISASI_BIAYA_AFE: Number,

    TOPOGRAFI: String,
    BRIDGING: String,
    OBJEKTIF: String,
    LINTASAN_MELALUI_SUMUR: String,
    NAMA_STRUKTUR_PNL: String,

    PROSPECT: Number,
    LEAD: Number,
    STATUS_RESOURCE_LAINNYA: Number,
    PLAY: String,
    RR_P50_OIL_MMBOE: Number,
    RR_P50_GAS_BSCF: Number,
    RR_TOTAL_P50_MMBOE: Number,

    FULL_FOLD: Number,
    NEAR_OFFSET_M: Number,
    FAR_OFFSET_M: Number,
    SHOT_POINT_INTERVAL_M: Number,
    RECEIVER_LINE_INTERVAL_M: Number,
    JUMLAH_SHOT_POINT_ESTIMATED: Number,
    SAMPLING_RATE_MS: Number,
    RECORD_LENGTH_S: Number,
    PANJANG_STREAMER: Number,
    JENIS_RECEIVER: Number,

    X_LONGITUDE: Number,
    Y_LATITUDE: Number,

    P_WPNB_WP_AFE_TEKNIS: Number,
    P_VALIDASI_PARAMETER_DESAIN: Number,
    P_SURAT_PEMBERITAHUAN_PELAKSANAAN: Number,
    P_LIASON_OFFICE: Number,
    P_SERTIFIKAT_PERSONEL_SKNI: Number,

    P_PROJECT_SUMMARY_MOM_SOW: Number,
    P_IZIN_HELIDECK: Number,
    P_PPKA: Number,
    P_MAKLUMAT_PELAYARAN: Number,
    P_BERITA_PELAUT_INDONESIA: Number,

    P_SCOUTING: Number,
    P_SOSIALISASI: Number,
    P_IZIN_PEMDA: Number,
    P_IZIN_PPKH: Number,
    P_IZIN_UKL_UPL: Number,

    P_IZIN_INSTANSI_LAIN: Number,
    P_IZIN_K3S_LAIN: Number,
    P_IZIN_OPEN_AREA: Number,
    P_IZIN_PELEDAK: Number,
    P_SECURITY_CLEARANCE: Number,

    P_PENGADAAN_KONTRAKTOR_SURVEI: Number,
    P_PENGADAAN_BAHAN_PELEDAK: Number,
    P_PENGADAAN_JASA_KENDALI_MUTU: Number,
    P_MOBILISASI: Number,
    P_ADVANCE_PARTY: Number,

    P_BASIC_PARTY: Number,
    P_REKLAMASI: Number,
    P_KOMPENSASI_GANTI_RUGI: Number,
    P_BASIC_PARTY: Number,
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
        pupos: {
            type: Object,
            default: undefined
        }
    },
    {
        timestamps: true,
        strict: false,
        collection: 'Kegiatan',
    }
)


module.exports = mongoose.model('Kegiatan', objSchema)
