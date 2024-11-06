//
// https://stackoverflow.com/questions/28860728/reading-excel-file-using-node-js
//
const path = require("path")
const fs = require("fs")

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

const rawdata = fs.readFileSync(fullpath_filename)
let data = JSON.parse(rawdata.toString())


console.log('------------------ insert to mongodb')

const { MongoClient } = require('mongodb')
const client = new MongoClient(CF.mongoose.url)
console.log('db:init .. connect to mongodb ' + CF.mongoose.url)

let target_col = process.argv[4]

let { features, ...otherKeys } = data
console.log(otherKeys)
// for (let i=0; i<list_obj.length; i++) {
//     console.log(list_obj[i])
// }

//
const create_project = (obj, parent, col_name) => {

    let tmp = {
        name: obj['properties'][col_name] || "",
        parent: parent,
        'type': obj['type'] || "",
        properties: obj["properties"] || {},
        geometry: {
            'type': obj['geometry']['type'] || "",
            coordinates: obj['geometry']['coordinates']
        }
    }
    return tmp
}


async function insert_obj(client, dbase, collection, src, col_name, parent) {
    try {
        const database = client.db(dbase)
        const obj = database.collection(collection)

        // console.log(src.length, col_name, parent)

        for (let i=0; i < src.length; i++) {

            // console.log(src[i]['properties'])

            let obj_exist = await obj.findOne({ name: src[i]['properties'][col_name] })
            if (obj_exist)
                await obj.deleteOne({  name: src[i]['properties'][col_name] })

            // check is not null
            if (!!src[i]['properties'][col_name]) {
                const result = await obj.insertOne( create_project(src[i], parent, col_name) )
                // console.log(src[i])
                console.log(i+1 + '  name: ' + src[i]['properties'][col_name] + ' .. a doc inserted _id : ' + result.insertedId)
            }
        }

    } catch(err) {
        console.log(err)
        await client.close()
    } finally {
        await client.close()
    }
}

insert_obj(client, 'MERN-geosurvey-01', 'GeoSpatialWK', features, target_col, otherKeys).catch(console.dir)
