//
// https://stackoverflow.com/questions/28860728/reading-excel-file-using-node-js
//
const path = require("path")
const XLSX = require("xlsx")

const CF = require('../conf/conf_app')

console.log('...execution directory : ', __dirname )

// print process.argv
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
        name: obj['NAMA_KEGIATAN'] || "",
        info: {
            TAHUN: 2024,
            NAMA_KEGIATAN: obj['NAMA_KEGIATAN'] || "",
            WK: obj['WK'] || "",
            STATUS_WK: obj['STATUS_WK'] || "",
            KKKS: obj['KKKS'] || "",
            HOLDING: obj['HOLDING'] || "",

            LABEL: obj['LABEL'] || "",
            JENIS_KEGIATAN: obj['JENIS_KEGIATAN'] || "",
            PANJANG_LUAS: obj['RENCANA_TOTAL_KUANTITAS_PEKERJAAN'] || 0,
            TOTAL_RESOURCE: obj['RR_TOTAL_P50_MMBOE'] || 0,
            NILAI_INVESTASI: obj['NILAI_INVESTASI'] || 0,
            TOTAL_ACTUAL_COST: obj['REALISASI_BIAYA_AFE'] || 0,
            HOLDING : obj['HOLDING'] || "",
            TIPE_KONTRAK: obj['TIPE_KONTRAK'] || "",
            REALISASI_STATUS_PELAKSANAAN: obj['REALISASI_STATUS_PELAKSANAAN'] || "",
            STATUS_USULAN_PROGRAM: obj['STATUS_USULAN_PROGRAM'] || "",
            JENIS_KOMITMEN: obj['JENIS_KOMITMEN'] || "",
            REALISASI_KUANTITAS_PEKERJAAN: obj['REALISASI_KUANTITAS_PEKERJAAN'] || 0,
            RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB: obj['RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB'] || 0,
            RENCANA_WAKTU_MULAI: ExcelDateToJSDate(obj['RENCANA_WAKTU_MULAI']) || null,
            RENCANA_WAKTU_SELESAI: ExcelDateToJSDate(obj['RENCANA_WAKTU_SELESAI']) || null,
            REALISASI_WAKTU_MULAI: ExcelDateToJSDate(obj['REALISASI_WAKTU_MULAI']) || null,
            REALISASI_WAKTU_SELESAI: ExcelDateToJSDate(obj['REALISASI_WAKTU_SELESAI']) || null,
            NO_AFE: obj['NO_AFE'] || "",
            NILAI_AFE: obj['NILAI_AFE'] || 0,
            REALISASI_BIAYA_AFE: obj['REALISASI_BIAYA_AFE'] || 0,
            STATUS_AFE_ONLINE: obj['STATUS_AFE_ONLINE'] || "",

            // X_LONGITUDE: obj['X_LONGITUDE'] || 0,
        },
        calc: {
            TOTAL_INVESTASI: 0,
            TOTAL_RESOURCE: 0
        },
        raw: { ...obj },
        // gantt: create_gantt(obj),
    }


    // calculate value
    if (tmp.info.TIPE_KONTRAK === 'PSC') {
        tmp.calc.TOTAL_INVESTASI = tmp.info.NILAI_AFE
    } else if (tmp.info.TIPE_KONTRAK === 'GS') {
        tmp.calc.TOTAL_INVESTASI = tmp.info.NILAI_INVESTASI
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

insert_obj(client, 'MERN-geosurvey-01', 'Kegiatan', sheet_json, target_col).catch(console.dir)



let column_names = [
    'LABEL',
    'WK',
    'KKKS',
    'STATUS_WK',
    'HOLDING',
    'TIPE_KONTRAK',
    'STATUS_USULAN_PROGRAM',
    'JENIS_KEGIATAN',
    'NAMA_KEGIATAN',
    'STATUS_BUNDLING',
    'NO_AFE',
    'NILAI_AFE',
    'NILAI_INVESTASI',
    'STATUS_PERSETUJUAN_TEKNIS',
    'JENIS_KOMITMEN',
    'JENIS_TAHAPAN_KEGIATAN',
    'AREA_KEGIATAN',
    'RENCANA_TOTAL_KUANTITAS_PEKERJAAN',
    'RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB',
    'RENCANA_WAKTU_MULAI',
    'RENCANA_WAKTU_SELESAI',
    'STATUS_AFE_ONLINE',
    'REGION_SKK',
    'PROVINSI',
    'REALISASI_STATUS_PELAKSANAAN',
    'REALISASI_WAKTU_MULAI',
    'REALISASI_WAKTU_SELESAI',
    'OUTLOOK_KEGIATAN',
    'REALISASI_KUANTITAS_PEKERJAAN_TAHUN_SEBELUMNYA',
    'REALISASI_KUANTITAS_PEKERJAAN',
    'P_REALISASI_KEGIATAN_TOTAL_AKUISISI',
    'P_REALISASI_KEGIATAN_TOTAL_WPNB',
    'REALISASI_BIAYA_AFE',
    'P_REALISASI_BIAYA_AFE',
    'JUMLAH_SHOT_POINT',
    'OBJEKTIF',
    'LINTASAN_MELALUI_SUMUR',
    'NAMA_PNL',
    'PROSPECT',
    'LEAD',
    'STATUS_RESOURCE_LAINNYA',
    'PLAY',
    'RR_P50_OIL_MMBOE',
    'RR_P50_GAS_BSCF',
    'RR_TOTAL_P50_MMBOE',
    'FULL_FOLD',
    'FULL_FOLD_COVERAGE',
    'P_WPNB_WP_AFE_TEKNIS',
    'P_VALIDASI_PARAMETER_DESAIN',
    'P_PENGADAAN_BARANG_JASA',
    'P_IZIN_UKL_UPL',
    'P_IZIN_PEMBERITAHUAN_PELAKSANAAN',
    'P_IZIN_OPEN_AREA',
    'P_IZIN_K3S_LAINNYA',
    'P_IZIN_PELEDAK',
    'P_IZIN_PPKH',
    'P_SECURITY_CLEARANCE',
    'P_LIASON_OFFICE',
    'P_PPKA',
    'P_SERTIFIKAT_KEAHLIAN',
    'P_PROJECT_SUMMARY_MOM_SOW',
    'P_SOSIALISASI',
    'P_IZIN_HELLDECK',
    'P_MAKLUMAT_PELAYARAN',
    'P_BERITA_PELAUT_INDONESIA'
]
