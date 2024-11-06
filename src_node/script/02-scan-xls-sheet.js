//
// https://stackoverflow.com/questions/28860728/reading-excel-file-using-node-js
//
const path = require("path")
const XLSX = require("xlsx")



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

console.log('-----------------------------------------')
console.log('... worksheet names')
console.log('-----------------------------------------')
let workbook = XLSX.readFile(fullpath_filename)
let list_sheet = workbook.Sheets
for (let i=0; i < workbook.SheetNames.length; i++) {
    console.log('workbook.SheetNames[' + i + ']  => ' + workbook.SheetNames[i])
}

console.log('-----------------------------------------')
target_sheet_name = process.argv[4]
console.log('-----------------------------------------')

const sheet_json = XLSX.utils.sheet_to_json(list_sheet[target_sheet_name])
// console.log(sheet_json[0])

console.log('...first json data', sheet_json)
console.log('...num of row ' + sheet_json.length)

console.log('-----------------------------------------')
console.log('... column names')
console.log('-----------------------------------------')
const [columns] = XLSX.utils.sheet_to_json(workbook.Sheets[target_sheet_name], { header: 1 })
console.log(columns)
