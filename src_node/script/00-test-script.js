//
//
console.log('...test-scripts')
console.log('...execution directory : ', __dirname )

// print process.argv
process.argv.forEach(function (val, index, array) {
    console.log('arg_index : ' + index + '  =>   arg_value : ' + val);
})
