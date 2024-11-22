//
// https://stackoverflow.com/questions/28860728/reading-excel-file-using-node-js
//
const path = require("path")
const fs = require("fs")
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


const create_project = (obj) => {
    let tmp = {
        name: obj['NAMA_STUDI'] || "",
        info: {

            LABEL: obj['LABEL'] || "",
            X_LONGITUDE: obj['X_LONGITUDE'] || 0,
            Y_LATITUDE: obj['Y_LATITUDE'] || 0,
            WK: obj['WK'] || "",
            KKKS: obj['KKKS'] || "",
            NAMA_STUDI: obj['NAMA_STUDI'] || "",
            HOLDING: obj['HOLDING'] || "",
            TIPE_STUDI: obj['TIPE_STUDI'] || "",
            REALISASI_STATUS_PELAKSANAAN: obj['REALISASI_STATUS_PELAKSANAAN'] || "",
        },
    }
    return tmp
}


async function insert_obj(client, dbase, collection, src, col_name, parent) {
    try {
        const database = client.db(dbase)
        const obj = database.collection(collection)

        // console.log(src.length, col_name, parent)

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

insert_obj(client,  CF.mongoose.database, 'GeoSpatialTitiKStudi', sheet_json, target_col).catch(console.dir)
