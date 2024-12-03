//
// https://stackoverflow.com/questions/28860728/reading-excel-file-using-node-js
//
const path = require("path")
const XLSX = require("xlsx")

const CF = require('../conf/conf_app')

console.log('...execution directory : ', __dirname )

console.log('-----------------------------------------')
console.log('... argv names')
console.log('-----------------------------------------')
process.argv.forEach(function (val, index, array) {
    console.log('arg_index : ' + index + '  =>   arg_value : ' + val);
})

rel_dir = process.argv[2]
filename = process.argv[3]


const fullpath_filename = path.join(__dirname, rel_dir, filename)
console.log(' ... ' + fullpath_filename)

console.log('------------------')
let workbook = XLSX.readFile(fullpath_filename, { cellDates: true })
let list_sheet = workbook.Sheets
for (let i=0; i < workbook.SheetNames.length; i++) {
    console.log('workbook.SheetNames[' + i + ']  => ' + workbook.SheetNames[i])
}

console.log('------------------')
target_sheet_name = process.argv[4]
const sheet_json = XLSX.utils.sheet_to_json(list_sheet[target_sheet_name])


target_col = process.argv[5]
let obj = null
let arr = []
for (let i=0; i < sheet_json.length; i++) {
    obj = sheet_json[i][target_col]
    // console.log( i + ' => ' + obj)
    arr = [ ...arr, obj]
}
console.log('...num of row ' + sheet_json.length)


console.log('------------------ insert to mongodb')

const { MongoClient } = require('mongodb')
const client = new MongoClient(CF.mongoose.url)
console.log('db:init .. connect to mongodb ' + CF.mongoose.url)




function ExcelDateToJSDate(serial) {
    if (serial) {
        let m = Date.parse(serial); //GMT date in milliseconds

        let mTZ = m + 9 * 3600 * 1000; //Asia/Tashkent +5 time zone. 18.000.000 = 5 hours in milliseconds.

        return new Date(mTZ);
    } else
        return null

}


const create_project = (obj) => {

    let tmp = {
        active: true,
        name: obj['NAMA_KEGIATAN'] || "",
        info: {
            TAHUN: obj['TAHUN'] || 0,
            NAMA_KEGIATAN: obj['NAMA_KEGIATAN'] || "",
            WK: obj['WK'] || "",
            STATUS_WK: obj['STATUS_WK'] || "",
            KKKS: obj['KKKS'] || "",
            HOLDING: obj['HOLDING'] || "",
            LABEL: obj['LABEL'] || "",

            STATUS_USULAN_PROGRAM: obj['STATUS_USULAN_PROGRAM'] || "",
            JENIS_KEGIATAN: obj['JENIS_KEGIATAN'] || "",
            JENIS_KOMITMEN: obj['JENIS_KOMITMEN'] || "",
            JENIS_TAHAPAN_KEGIATAN: obj['JENIS_TAHAPAN_KEGIATAN'] || "",
            AREA_KEGIATAN: obj['AREA_KEGIATAN'] || "",

            STATUS_PERSETUJUAN_TEKNIS: obj['STATUS_PERSETUJUAN_TEKNIS'] || "",
            TIPE_KONTRAK: obj['TIPE_KONTRAK'] || "",
            STATUS_BUNDLING: obj['STATUS_BUNDLING'] || "",
            NO_AFE: obj['NO_AFE'] || "",
            NILAI_AFE_INVESTASI: obj['NILAI_AFE_INVESTASI'] || 0,
            STATUS_AFE_ONLINE: obj['STATUS_AFE_ONLINE'] || "",

            RENCANA_KUANTITAS_PEKERJAAN: obj['RENCANA_KUANTITAS_PEKERJAAN'] || 0,
            RENCANA_WAKTU_MULAI: ExcelDateToJSDate(obj['RENCANA_WAKTU_MULAI']) ||  new Date(),
            RENCANA_WAKTU_SELESAI: ExcelDateToJSDate(obj['RENCANA_WAKTU_SELESAI']) ||  new Date(),

            WILAYAH_INDONESIA: obj['WILAYAH_INDONESIA'] || "",
            PROVINSI: obj['PROVINSI'] || "",
            KENDALA_OPERASIONAL_LAPANGAN: obj['KENDALA_OPERASIONAL_LAPANGAN'] || "",
            REALISASI_STATUS_PELAKSANAAN: obj['REALISASI_STATUS_PELAKSANAAN'] || "",
            OUTLOOK_KEGIATAN: obj['OUTLOOK_KEGIATAN'] || "",

            REALISASI_WAKTU_MULAI: ExcelDateToJSDate(obj['REALISASI_WAKTU_MULAI']) ||  new Date(),
            REALISASI_WAKTU_SELESAI: ExcelDateToJSDate(obj['REALISASI_WAKTU_SELESAI']) ||  new Date(),

            REALISASI_KUANTITAS_PEKERJAAN: obj['REALISASI_KUANTITAS_PEKERJAAN'] || 0,
            P_REALISASI_KEGIATAN: obj['P_REALISASI_KEGIATAN'] || 0,
            REALISASI_AFE_INVESTASI: obj['REALISASI_AFE_INVESTASI'] || 0,
            P_REALISASI_AFE_INVESTASI: obj['P_REALISASI_AFE_INVESTASI'] || 0,

            TOPOGRAFI: obj['TOPOGRAFI'] || "",
            BRIDGING: obj['BRIDGING'] || "",
            OBJEKTIF: obj['OBJEKTIF'] || "",
            LINTASAN_MELALUI_SUMUR: obj['LINTASAN_MELALUI_SUMUR'] || "",
            NAMA_STRUKTUR_PNL: obj['NAMA_STRUKTUR_PNL'] || "",

            PROSPECT: obj['PROSPECT'] || 0,
            LEAD: obj['LEAD'] || 0,
            STATUS_RESOURCE_LAINNYA: obj['STATUS_RESOURCE_LAINNYA'] || 0,
            PLAY: obj['PLAY'] || "",
            RR_P50_OIL_MMBOE: obj['RR_P50_OIL_MMBOE'] || 0,
            RR_P50_GAS_BSCF: obj['RR_P50_GAS_BSCF'] || 0,
            RR_TOTAL_P50_MMBOE: obj['RR_TOTAL_P50_MMBOE'] || 0,

            FULL_FOLD: obj['FULL_FOLD'] || 0,
            NEAR_OFFSET_M: obj['NEAR_OFFSET_M'] || 0,
            FAR_OFFSET_M: obj['FAR_OFFSET_M'] || 0,
            SHOT_POINT_INTERVAL_M: obj['SHOT_POINT_INTERVAL_M'] || 0,
            RECEIVER_LINE_INTERVAL_M: obj['RECEIVER_LINE_INTERVAL_M'] || 0,
            JUMLAH_SHOT_POINT_ESTIMATED: obj['JUMLAH_SHOT_POINT_ESTIMATED'] || 0,
            SAMPLING_RATE_MS: obj['SAMPLING_RATE_MS'] || 0,
            RECORD_LENGTH_S: obj['RECORD_LENGTH_S'] || 0,
            PANJANG_STREAMER: obj['PANJANG_STREAMER'] || 0,
            JENIS_RECEIVER: obj['JENIS_RECEIVER'] || "",

            X_LONGITUDE: obj['X_LONGITUDE'] || 0,
            Y_LATITUDE: obj['Y_LATITUDE'] || 0,

            P_WPNB_WP_AFE_TEKNIS: obj['P_WPNB_WP_AFE_TEKNIS'] || 0,
            P_VALIDASI_PARAMETER_DESAIN: obj['P_VALIDASI_PARAMETER_DESAIN'] || 0,
            P_SURAT_PEMBERITAHUAN_PELAKSANAAN: obj['P_SURAT_PEMBERITAHUAN_PELAKSANAAN'] || 0,
            P_LIASON_OFFICE: obj['P_LIASON_OFFICE'] || 0,
            P_SERTIFIKAT_PERSONEL_SKNI: obj['P_SERTIFIKAT_PERSONEL_SKNI'] || 0,

            P_PROJECT_SUMMARY_MOM_SOW: obj['P_PROJECT_SUMMARY_MOM_SOW'] || 0,
            P_IZIN_HELIDECK: obj['P_IZIN_HELIDECK'] || 0,
            P_PPKA: obj['P_PPKA'] || 0,
            P_MAKLUMAT_PELAYARAN: obj['P_MAKLUMAT_PELAYARAN'] || 0,
            P_BERITA_PELAUT_INDONESIA: obj['P_BERITA_PELAUT_INDONESIA'] || 0,

            P_SCOUTING: obj['P_SCOUTING'] || 0,
            P_SOSIALISASI: obj['P_SOSIALISASI'] || 0,
            P_IZIN_PEMDA: obj['P_IZIN_PEMDA'] || 0,
            P_IZIN_PPKH: obj['P_IZIN_PPKH'] || 0,
            P_IZIN_UKL_UPL: obj['P_IZIN_UKL_UPL'] || 0,

            P_IZIN_INSTANSI_LAIN: obj['P_IZIN_INSTANSI_LAIN'] || 0,
            P_IZIN_K3S_LAIN: obj['P_IZIN_K3S_LAIN'] || 0,
            P_IZIN_OPEN_AREA: obj['P_IZIN_OPEN_AREA'] || 0,
            P_IZIN_PELEDAK: obj['P_IZIN_PELEDAK'] || 0,
            P_SECURITY_CLEARANCE: obj['P_SECURITY_CLEARANCE'] || 0,

            P_PENGADAAN_KONTRAKTOR_SURVEI: obj['P_PENGADAAN_KONTRAKTOR_SURVEI'] || 0,
            P_PENGADAAN_BAHAN_PELEDAK: obj['P_PENGADAAN_BAHAN_PELEDAK'] || 0,
            P_PENGADAAN_JASA_KENDALI_MUTU: obj['P_PENGADAAN_JASA_KENDALI_MUTU'] || 0,
            P_MOBILISASI: obj['P_MOBILISASI'] || 0,
            P_ADVANCE_PARTY: obj['P_ADVANCE_PARTY'] || 0,

            P_BASIC_PARTY: obj['P_BASIC_PARTY'] || 0,
            P_REKLAMASI: obj['P_REKLAMASI'] || 0,
            P_KOMPENSASI_GANTI_RUGI: obj['P_KOMPENSASI_GANTI_RUGI'] || 0,
            P_BASIC_PARTY: obj['P_DEMOBILISASI'] || 0,

        }
    }

    return tmp
}

async function insert_obj(client, dbase, collection, src, col_name) {
    try {
        const database = client.db(dbase)
        const obj = database.collection(collection)

        for (let i=0; i < src.length; i++) {

            let obj_exist = await obj.findOne({ name: src[i][col_name] })
            if (obj_exist)
                await obj.deleteOne({  name: src[i][col_name] })

            // check is not null
            if (!!src[i][col_name]) {
                const result = await obj.insertOne( create_project(src[i]) )
                // console.log(src[i])
                console.log((i+1) + '  name: ' + src[i][col_name] + ' .. a doc inserted _id : ' + result.insertedId)
            }
        }

    } catch(err) {
        console.log(err)
        await client.close()
    } finally {
        await client.close()
    }
}

insert_obj(client,  CF.mongoose.database, 'Kegiatan', sheet_json, target_col).catch(console.dir)



let column_names_v4 = [
    'TAHUN',
    'LABEL',
    'NAMA_KEGIATAN',
    'WK',
    'STATUS_WK',
    'KKKS',
    'HOLDING',
    'STATUS_USULAN_PROGRAM',
    'JENIS_KEGIATAN',
    'JENIS_KOMITMEN',
    'JENIS_TAHAPAN_KEGIATAN',
    'AREA_KEGIATAN',
    'STATUS_PERSETUJUAN_TEKNIS',
    'TIPE_KONTRAK',
    'STATUS_BUNDLING',
    'NO_AFE',
    'NILAI_AFE',
    'NILAI_INVESTASI',
    'STATUS_AFE_ONLINE',
    'RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB',
    'RENCANA_WAKTU_MULAI',
    'RENCANA_WAKTU_SELESAI',
    'REGION_SKK',
    'PROVINSI',
    'KENDALA_OPERASIONAL_LAPANGAN',
    'REALISASI_STATUS_PELAKSANAAN',
    'OUTLOOK_KEGIATAN',
    'REALISASI_WAKTU_MULAI',
    'REALISASI_WAKTU_SELESAI',
    'REALISASI_KUANTITAS_PEKERJAAN_TAHUN_WPNB',
    'P_REALISASI_KEGIATAN_TOTAL_WPNB',
    'REALISASI_BIAYA_AFE',
    'P_REALISASI_BIAYA_AFE',
    'TOPOGRAFI',
    'BRIDGING',
    'OBJEKTIF',
    'LINTASAN_MELALUI_SUMUR',
    'NAMA_STRUKTUR_PNL',
    'PROSPECT',
    'LEAD',
    'STATUS_RESOURCE_LAINNYA',
    'PLAY',

    'RR_P50_OIL_MMBOE',
    'RR_P50_GAS_BSCF',
    'RR_TOTAL_P50_MMBOE',
    'FULL_FOLD',
    'NEAR_OFFSET_M',
    'FAR_OFFSET_M',
    'SHOT_POINT_INTERVAL_M',
    'RECEIVER_LINE_INTERVAL_M',
    'JUMLAH_SHOT_POINT_ESTIMATED',
    'SAMPLING_RATE_MS',
    'RECORD_LENGTH_S',
    'PANJANG_STREAMER',
    'JENIS_RECEIVER',

    'X_LONGITUDE',
    'Y_LATITUDE',

    'P_WPNB_WP_AFE_TEKNIS',
    'P_VALIDASI_PARAMETER_DESAIN',
    'P_SURAT_PEMBERITAHUAN_PELAKSANAAN',
    'P_LIASON_OFFICE',
    'P_SERTIFIKAT_PERSONEL_SKNI',
    'P_PROJECT_SUMMARY_MOM_SOW',
    'P_IZIN_HELIDECK',
    'P_PPKA',
    'P_MAKLUMAT_PELAYARAN',
    'P_BERITA_PELAUT_INDONESIA',
    'P_SCOUTING',
    'P_SOSIALISASI',
    'P_IZIN_PEMDA',
    'P_IZIN_PPKH',
    'P_IZIN_UKL_UPL',
    'P_IZIN_INSTANSI_LAIN',
    'P_IZIN_K3S_LAIN',
    'P_IZIN_OPEN_AREA',
    'P_IZIN_PELEDAK',
    'P_SECURITY_CLEARANCE',

    'P_PENGADAAN_KONTRAKTOR_SURVEI',
    'P_PENGADAAN_BAHAN_PELEDAK',
    'P_PENGADAAN_JASA_KENDALI_MUTU',
    'P_MOBILISASI',
    'P_ADVANCE_PARTY',

    'P_BASIC_PARTY',
    'P_REKLAMASI',
    'P_KOMPENSASI_GANTI_RUGI',
    'P_DEMOBILISASI'
]

let column_names_v5 = [
  'TAHUN',
  'LABEL',
  'NAMA_KEGIATAN',
  'WK',
  'STATUS_WK',
  'KKKS',
  'HOLDING',
  'STATUS_USULAN_PROGRAM',
  'JENIS_KEGIATAN',
  'JENIS_KOMITMEN',
  'JENIS_TAHAPAN_KEGIATAN',
  'AREA_KEGIATAN',
  'STATUS_PERSETUJUAN_TEKNIS',
  'TIPE_KONTRAK',
  'STATUS_BUNDLING',
  'NO_AFE',
  'NILAI_AFE_INVESTASI',
  'STATUS_AFE_ONLINE',
  'RENCANA_KUANTITAS_PEKERJAAN',
  'RENCANA_WAKTU_MULAI',
  'RENCANA_WAKTU_SELESAI',
  'WILAYAH_INDONESIA',
  'PROVINSI',
  'KENDALA_OPERASIONAL_LAPANGAN',
  'REALISASI_STATUS_PELAKSANAAN',
  'OUTLOOK_KEGIATAN',
  'REALISASI_WAKTU_MULAI',
  'REALISASI_WAKTU_SELESAI',
  'REALISASI_KUANTITAS_PEKERJAAN',
  'P_REALISASI_KEGIATAN',
  'REALISASI_AFE_INVESTASI',
  'P_REALISASI_AFE_INVESTASI',
  'TOPOGRAFI',
  'BRIDGING',
  'OBJEKTIF',
  'LINTASAN_MELALUI_SUMUR',
  'NAMA_STRUKTUR_PNL',
  'PROSPECT',
  'LEAD',
  'STATUS_RESOURCE_LAINNYA',
  'PLAY',
  'RR_P50_OIL_MMBOE',
  'RR_P50_GAS_BSCF',
  'RR_TOTAL_P50_MMBOE',
  'FULL_FOLD',
  'NEAR_OFFSET_M',
  'FAR_OFFSET_M',
  'SHOT_POINT_INTERVAL_M',
  'RECEIVER_LINE_INTERVAL_M',
  'JUMLAH_SHOT_POINT_ESTIMATED',
  'SAMPLING_RATE_MS',
  'RECORD_LENGTH_S',
  'PANJANG_STREAMER',
  'JENIS_RECEIVER',
  'X_LONGITUDE',
  'Y_LATITUDE',
  'P_WPNB_WP_AFE_TEKNIS',
  'P_VALIDASI_PARAMETER_DESAIN',
  'P_SURAT_PEMBERITAHUAN_PELAKSANAAN',
  'P_LIASON_OFFICE',
  'P_SERTIFIKAT_PERSONEL_SKNI',
  ' P_PROJECT_SUMMARY_MOM_SOW',
  'P_IZIN_HELIDECK',
  'P_PPKA',
  'P_MAKLUMAT_PELAYARAN',
  'P_BERITA_PELAUT_INDONESIA',
  'P_SCOUTING',
  'P_SOSIALISASI',
  'P_IZIN_PEMDA',
  'P_IZIN_PPKH',
  'P_IZIN_UKL_UPL',
  'P_IZIN_INSTANSI_LAIN',
  'P_IZIN_K3S_LAIN',
  'P_IZIN_OPEN_AREA',
  'P_IZIN_PELEDAK',
  'P_SECURITY_CLEARANCE',
  'P_PENGADAAN_KONTRAKTOR_SURVEI',
  'P_PENGADAAN_BAHAN_PELEDAK',
  'P_PENGADAAN_JASA_KENDALI_MUTU',
  'P_MOBILISASI',
  'P_ADVANCE_PARTY',
  'P_BASIC_PARTY',
  'P_REKLAMASI',
  'P_KOMPENSASI_GANTI_RUGI',
  'P_DEMOBILISASI'
]
