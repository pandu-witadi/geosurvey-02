//
//
const mongoose = require('mongoose')


const objSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        fullname: String,
        tag: [ String ],
        active: {
            type: Boolean,
            default: true
        },
        info: {}
    },
    {
        timestamps: true,
        collection: 'raw'
    }
)


module.exports = mongoose.model('Raw', objSchema)
