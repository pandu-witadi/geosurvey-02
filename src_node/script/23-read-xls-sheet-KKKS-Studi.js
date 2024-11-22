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
    console.log( i + ' => ' + obj)
    arr = [ ...arr, obj]
}
console.log('...num of row ' + sheet_json.length)

console.log('------------------')
let unique_obj = arr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(unique_obj)
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

insert_list(client,  CF.mongoose.database, 'KKKSStudi', unique_obj).catch(console.dir)
