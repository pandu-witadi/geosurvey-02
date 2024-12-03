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
let workbook = XLSX.readFile(fullpath_filename)
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

console.log('------------------')
let unique_obj = arr.filter((item, i, ar) => ar.indexOf(item) === i);
// console.log(unique_obj)
console.log('...num of unique ' + target_col + ' : ' + unique_obj.length)



console.log('------------------ insert to mongodb')

const { MongoClient } = require('mongodb')
const client = new MongoClient(CF.mongoose.url)
console.log('db:init .. connect to mongodb ' + CF.mongoose.url)



async function insert_list(client, dbase, collection, src) {
    try {
        const database = client.db(dbase)
        const obj = database.collection(collection)

        for (let i=0; i < src.length; i++) {

            let obj_exist = await obj.findOne({ name: src[i] })
            if (obj_exist)
                await obj.deleteOne({  name: src[i] })

            // check is not null
            if (!!src[i]) {
                const result = await obj.insertOne({
                    name: src[i],
                    tag: [ src[i] ]
                })

                console.log((i+1) + '  name: ' + src[i] + ' .. a doc inserted _id : ' + result.insertedId)
            }
        }

    } catch(err) {
        console.log(err)
        await client.close()
    } finally {
        await client.close()
    }
}

insert_list(client,  CF.mongoose.database, 'WKKegiatan', unique_obj).catch(console.dir)


col = [
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
    'NILAI_INVESTASI',
    'STATUS_AFE_ONLINE',
    'RENCANA_KUANTITAS_PEKERJAAN',
    'RENCANA_WAKTU_MULAI',
    'RENCANA_WAKTU_SELESAI',
    'REGION_SKK',
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
