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
        name: obj['NAMA_STUDI'] || "",
        info: {
            TAHUN: obj['TAHUN'] || 0,
            LABEL: obj['LABEL'] || "",
            KKKS: obj['KKKS'] || "",
            HOLDING : obj['HOLDING'] || "",
            WK : obj['WK'] || "",
            STATUS_WK : obj['STATUS_WK'] || "",

            NAMA_STUDI : obj['NAMA_STUDI'] || "",
            TIPE_STUDI : obj['TIPE_STUDI'] || "",
            BASIN : obj['BASIN'] || "",

            RENCANA_WAKTU_MULAI: ExcelDateToJSDate(obj['RENCANA_WAKTU_MULAI']) || null,
            RENCANA_WAKTU_SELESAI: ExcelDateToJSDate(obj['RENCANA_WAKTU_SELESAI']) || null,
            REALISASI_WAKTU_MULAI: ExcelDateToJSDate(obj['REALISASI_WAKTU_MULAI']) || null,
            REALISASI_WAKTU_SELESAI: ExcelDateToJSDate(obj['REALISASI_WAKTU_SELESAI']) || null,

            REALISASI_STATUS_PELAKSANAAN: obj['REALISASI_STATUS_PELAKSANAAN'] || "",

            RENCANA_ANGGARAN_AFE_INVESTASI: obj['RENCANA_ANGGARAN_AFE_INVESTASI'] || 0,
            REALISASI_ANGGARAN_AFE_INVESTASI: obj['REALISASI_ANGGARAN_AFE_INVESTASI'] || 0,

            RR_MMBOE: obj['RR_MMBOE'] || 0,
            RR_MMBOE_INPLACE: obj['RR_MMBOE_INPLACE'] || 0,

        },
        raw: { ...obj },
    }


    // // calculate value
    // if (tmp.info.TIPE_KONTRAK === 'PSC') {
    //     tmp.calc.TOTAL_INVESTASI = tmp.AFE.NILAI_AFE
    // } else if (tmp.info.TIPE_KONTRAK === 'GS') {
    //     tmp.calc.TOTAL_INVESTASI = tmp.info.NILAI_INVESTASI
    // }


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
                console.log(i+1 + '  name: ' + src[i][col_name] + ' .. a doc inserted _id : ' + result.insertedId)
            }
        }

    } catch(err) {
        console.log(err)
        await client.close()
    } finally {
        await client.close()
    }
}

insert_obj(client, 'MERN-geosurvey-01', 'Studi', sheet_json, target_col).catch(console.dir)



let column_names = [
  'TAHUN',
  'LABEL',
  'KKKS',
  'HOLDING',
  'WK',
  'STATUS_WK',
  'TIPE_KONTRAK',
  'BASIN',
  'NAMA_STUDI',
  'NAMA_STRUKTUR_PROSPECT_LEAD',
  'PROSPECT_AND_UNDEVELOPED',
  'LEAD',
  'RR_MBOE',
  'RR_MMBOE_INPLACE',
  'TIPE_AFE',
  'NO_AFE',
  'STATUS_USULAN_KEGIATAN',
  'JENIS_KOMITMEN',
  'RENCANA_WAKTU_MULAI',
  'RENCANA_WAKTU_SELESAI',
  'RENCANA_ANGGARAN_AFE_INVESTASI',
  'STATUS_WPNB',
  'KETERANGAN_RENCANA',
  'TIPE',
  'TIPE_STUDI',
  'PIC',
  'VALIDATOR',
  'PIC_KKKS',
  'P_PROGRESS_PELAKSANAAN',
  'REALISASI_ANGGARAN_AFE_INVESTASI',
  'REALISASI_WAKTU_MULAI',
  'REALISASI_WAKTU_SELESAI',
  'KETERANGAN_REALISASI',
  'VENDOR',
  'REALISASI_STATUS_PELAKSANAAN',
  'PIC_POKJA_CHECK',
  'X_LONGITUDE',
  'Y_LATITUDE'
]
