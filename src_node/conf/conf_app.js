//
//
require('dotenv').config()

let CF = {
    app: {
        name: "geosurvey_v02",
        version: "0.0.1"
    },
    server: {
        port: 5155,
        apiPath: '/api',
        env: 'development',
        host: 'http://localhost'
    },
    path: {
        file: '/upload/file',
        image: '/upload/image',
        video: '/upload/video',
        kegiatan: '/upload/kegiatan',
        studi: '/upload/studi'
    },
    // mongodb setting
    mongoose: {
        options: {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        },
        uri : 'mongodb://127.0.0.1:27017',
        database : 'MERN-geosurvey-01',
    },
    jwt: {
        isAuth: true,
        authentication_token_name: 'accessToken',
        saltLength: 10,
        accessToken: "edflvwgv684r04jmyg3s",
        accessTokenLife:  60 * 60 * 24 * 7,  // 60 minute * 24 *7

        refreshToken: "czxvlq511ugcwzw10jzk",
        refreshTokenLife:  60 * 60 * 24 * 14// 60 minute * 24 *7
    },
    frontEnd: {
        path: '/client_react/build'
    },
    model : {
        user: {
            register_state: true,
            automated_active: true
        }
    }
}

CF.server.ENV = process.env.ENV || CF.server.env
CF.server.PORT = process.env.PORT || CF.server.port

CF.jwt.saltLength =  process.env.saltLength || CF.jwt.saltLength

CF.jwt.accessToken =  process.env.ACCESS_TOKEN_SECRET || CF.jwt.accessToken
CF.jwt.accessTokenLife =  process.env.ACCESS_TOKEN_LIFE || CF.jwt.accessTokenLife

CF.jwt.refreshToken =  process.env.REFRESH_TOKEN_SECRET || CF.jwt.refreshToken
CF.jwt.refreshTokenLife =  process.env.REFRESH_TOKEN_LIFE || CF.jwt.refreshTokenLife

CF.server.path_file = CF.server.host + ':' + CF.server.PORT.toString() + CF.path.file
CF.server.path_image = CF.server.host + ':' + CF.server.PORT.toString() + CF.path.image
CF.server.path_video = CF.server.host + ':' + CF.server.PORT.toString() + CF.path.video

CF.server.path_kegiatan = CF.server.host + ':' + CF.server.PORT.toString() + CF.path.kegiatan
CF.server.path_studi = CF.server.host + ':' + CF.server.PORT.toString() + CF.path.studi

CF.mongoose.url  = CF.mongoose.uri + '/' + CF.mongoose.database

module.exports = CF
