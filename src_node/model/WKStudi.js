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
        email: String,
        tag: [ String ],
        active: {
            type: Boolean,
            default: true
        },
        info: {},
        raw: {}
    },
    {
        timestamps: true,
        strict: false,
        collection: 'WKStudi'
    }
)


module.exports = mongoose.model('WKStudi', objSchema)
