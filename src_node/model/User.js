//
//
const mongoose = require('mongoose')


const objSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: [
                'user',
                'admin',
                'contractor',
                'guest'
            ],
            default: 'user'
        },
        token: String,
        fullname: String,
        tag: [ String ],
        active: {
            type: Boolean,
            default: true
        },
        imageUrl: String,
    },
    {
        timestamps: true,
        strict: false,
        collection: 'user'
    }
)


module.exports = mongoose.model('User', objSchema)
