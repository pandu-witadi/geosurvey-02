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
        collection: 'WKKegiatan'
    }
)


module.exports = mongoose.model('WKKegiatan', objSchema)
