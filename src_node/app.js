//
//
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const fileUpload = require('express-fileupload')


const connectMongoDB = require('./db/mongodb-conn')
const { notFound, errorHandler } = require('./middleware/error')
const CF = require('./conf/conf_app')


const app = express()

if ( CF.server.ENV !== 'production' ) {
    const morgan = require('morgan')
    app.use( morgan('dev') )
}


app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({ extended: true, limit: "50mb" }))

app.use( fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
}))

// Database Connection
mongoose.Promise = global.Promise
Promise.resolve(app)
    .then( connectMongoDB() )
    .catch(err => console.error.bind(console, `MongoDB connection error: ${JSON.stringify(err)}`))




// for uploading

console.log( '__dirname   :  ' + __dirname)
// console.log( '[map file]  :  ' + CF.server.path_file + '  ->  ' + path.join(__dirname, CF.path.file) )
// app.use( '/upload/file', express.static( path.join(__dirname, CF.path.file) ) )
// console.log( '[map image] :  ' + CF.server.path_image + '  ->  ' + path.join(__dirname, CF.path.image) )
app.use( '/upload/kegiatan', express.static( path.join(__dirname, CF.path.kegiatan) ) )
// console.log( '[map video] :  ' + CF.server.path_video + '  ->  ' + path.join(__dirname, CF.path.video) )
// app.use( '/upload/video', express.static( path.join(__dirname, CF.path.video) ) )

console.log('...')
console.log( '[map kegiatan] :  ' + CF.server.path_kegiatan + '  ->  ' + path.join(__dirname, CF.path.kegiatan) )
app.use( '/upload/kegiatan', express.static( path.join(__dirname, CF.path.kegiatan) ) )
console.log( '[map studi] :  ' + CF.server.path_studi + '  ->  ' + path.join(__dirname, CF.path.studi) )
app.use( '/upload/studi', express.static( path.join(__dirname, CF.path.studi) ) )
console.log('...')

// use: route
app.use('/api/test',                        require('./api/test'))
app.use('/api/user',                        require('./api/user'))

app.use('/api/WK',                          require('./api/WK'))
app.use('/api/holding',                     require('./api/holding'))
app.use('/api/KKKS',                        require('./api/KKKS'))
app.use('/api/geospatial',                  require('./api/geospatial'))

app.use('/api/dashboard',                   require('./api/dashboard'))

app.use('/api/kegiatan',                    require('./api/kegiatan'))
app.use('/api/studi',                       require('./api/studi'))

app.use('/api/file',                        require('./api/file'))

// serve client
//these 3 lines make sure that Angular/VUe/React and express app are coming from the same server
const frontEndPath = path.join(__dirname, '..', CF.frontEnd.path)
console.log(frontEndPath)
app.use( express.static(frontEndPath) )
app.get( ['/*'], function(req, res) {
        res.sendFile('index.html',  { root: frontEndPath } )
    }
)

// catch notFound and errorHandler
app.use(notFound)
app.use(errorHandler)

module.exports = app
