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

const create_doc = (obj) => {
    let tmp = {
        active: true,
        WK: obj['WK'] || "",
        HOLDING: obj['HOLDING'] || "",
        KKKS: obj['KKKS'] || "",
        FASE_WK: obj['FASE_WK'] || "",
        JENIS_WK: obj['JENIS_WK'] || "",
        STATUS_KEAKTIFAN_WK: obj['STATUS_KEAKTIFAN_WK'] || "",
        STATUS_PRODUKSI: obj['STATUS_PRODUKSI'] || "",
        JENIS_KONTRAK: obj['JENIS_KONTRAK'] || "",
        ONS_OFF: obj['ONS_OFF'] || "",
        LUAS_WK_AWAL_KM2: obj['LUAS_WK_AWAL_KM2'] || 0,
        LUAS_WK_SAAT_INI_KM2: obj['LUAS_WK_SAAT_INI_KM2'] || 0,
        TGL_EFEKTIF: ExcelDateToJSDate(['TGL_EFEKTIF']) || null,
    }
    return tmp
}

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
                const result = await obj.insertOne( create_doc(src[i]) )

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

insert_list(client,  CF.mongoose.database, 'KegiatanKKKSWKHolding', sheet_json, target_col).catch(console.dir)


col = [
    'WK',
    'HOLDING',
    'OPERATOR',
    'FASE_WK',
    'JENIS_WK',
    'STATUS_KEAKTIFAN_WK',
    'STATUS_PRODUKSI',
    'JENIS_KONTRAK',
    'ONS_OFF',
    'LUAS_WK_AWAL_KM2',
    'LUAS_WK_SAAT_INI_KM2',
    'TGL_EFEKTIF'
]
