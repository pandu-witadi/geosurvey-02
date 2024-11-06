//
//
const CF = require('../conf/conf_app')
const { appCurrentDateTime } = require('../util/time_format')


let api = {
    "test": {
        "/api/test": {
            "method": "GET",
            "url": "/api/test",
            "input": {},
            "desc": "test get check server health and API"
        },
        "/api/test/auth": {
            "method": "GET",
            "url": "/api/test/auth",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "test get check server health and API"
        }
    },
    "dashboard": {
        "/api/dashboard/kegiatan": {
            "method": "POST",
            "url": "/api/dashboard/kegiatan",
            "input": {
                "arr_TAHUN": [
                    2024
                ],
                "arr_JENIS_KEGIATAN": [
                ],
            	"arr_HOLDING": [
            	],
            	"arr_WK": [
            	]
            },
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "post dashboard Kegiatan"
        },
        "/api/dashboard/studi": {
            "method": "POST",
            "url": "/api/dashboard/studi`",
            "input": {
                "arr_TAHUN": [
                    2024
                ],
                "arr_TIPE_STUDI": [
                ],
            	"arr_HOLDING": [
            	],
            	"arr_WK": [
            	]
            },
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "post dashboard Studi"
        },
    },
    "geospatial": {
        "/api/geospatial/WK": {
            "method": "POST",
            "url": "/api/geospatial/WK",
            "input": {
                "arr_TIPE_STUDI": [
                    "Studi Prospektivitas"
                ],
            	"arr_HOLDING": [
            	],
            	"arr_WK": [
            	]
            },
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get geospatial polygon WK"
        },
        "/api/geospatial/titik-kegiatan": {
            "method": "POST",
            "url": "/api/geospatial/titik-kegiatan",
            "input": {
                "arr_JENIS_KEGIATAN": [
                ],
            	"arr_HOLDING": [
            	],
            	"arr_WK": [
            	]
            },
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get geospatial titik Kegiatan"
        },
        "/api/geospatial/titik-studi": {
            "method": "POST",
            "url": "/api/geospatial/titik-kegiatan",
            "input": {
                "arr_TIPE_STUDI": [
                    "Studi Prospektivitas"
                ],
                "arr_HOLDING": [
                ],
                "arr_WK": [
                ]
            },
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get geospatial titik Studi"
        },
    },
    "WK": {
        "/api/WK/kegiatan/q_find-all": {
            "method": "GET",
            "url": "/api/WK/kegiatan/q_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get WK Kegiatan find-all"
        },
        "/api/WK/kegiatan/q-s_find-all": {
            "method": "GET",
            "url": "/api/WK/kegiatan/q-s_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get WK Kegiatan find-all summary"
        },
        "/api/WK/studi/q_find-all": {
            "method": "GET",
            "url": "/api/WK/studi/q_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get WK studi find-all"
        },
        "/api/WK/studi/q-s_find-all": {
            "method": "GET",
            "url": "/api/WK/studi/q-s_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get WK studi find-all summary"
        },
    },
    "holding": {
        "/api/holding/kegiatan/q_find-all": {
            "method": "GET",
            "url": "/api/holding/kegiatan/q_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get holding Kegiatan find-all"
        },
        "/api/holding/kegiatan/q-s_find-all": {
            "method": "GET",
            "url": "/api/holding/kegiatan/q-s_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get holding Kegiatan find-all summary"
        },
        "/api/holding/studi/q_find-all": {
            "method": "GET",
            "url": "/api/holding/studi/q_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get holding studi find-all"
        },
        "/api/holding/studi/q-s_find-all": {
            "method": "GET",
            "url": "/api/WK/studi/q-s_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get holding studi find-all summary"
        },
    },
    "KKKS": {
        "/api/KKKS/kegiatan/q_find-all": {
            "method": "GET",
            "url": "/api/KKKS/kegiatan/q_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get KKKS Kegiatan find-all"
        },
        "/api/KKKS/kegiatan/q-s_find-all": {
            "method": "GET",
            "url": "/api/KKKS/kegiatan/q-s_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get KKKS Kegiatan find-all summary"
        },
        "/api/KKKS/studi/q_find-all": {
            "method": "GET",
            "url": "/api/KKKS/studi/q_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get KKKS studi find-all"
        },
        "/api/KKKS/studi/q-s_find-all": {
            "method": "GET",
            "url": "/api/KKKS/studi/q-s_find-all",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "get KKKS studi find-all summary"
        },
    },
    "user": {
        "/api/user/register": {
            "method": "POST",
            "url": "/api/user/register",
            "input": {
                "email": "user101@mail.com",
                "password": "user101",
                "username": "user101"
            },
            "desc": "user register"
        },
        "/api/user/login": {
            "method": "POST",
            "url": "/api/user/login",
            "input": {
            	"email": "user101@mail.com",
            	"password": "user101"
            },
            "desc": "user login"
        },
    },
    "studi": {
        "/api/studi/q_select": {
            "method": "POST",
            "url": "/api/studi/q_select",
            "input": {
                "arr_TAHUN": [
                    2024
                ],
            	"arr_TIPE_STUDI": [
                    "Studi Prospektivitas"
            	],
            	"arr_HOLDING": [

            	],
            	"arr_WK": [
            	]
            },
            "desc": "test get check server health and API"
        },
    },
    "kegiatan": {
        "/api/kegiatan/q_select": {
            "method": "POST",
            "url": "/api/kegiatan/q_select",
            "input": {
                "arr_TAHUN": [
                    2024
                ],
            	"arr_JENIS_KEGIATAN": [
            	],
            	"arr_HOLDING": [

            	],
            	"arr_WK": [
            	]
            },
            "desc": "get list kegiatan"
        },
        "/api/kegiatan/:kegiatanId": {
            "method": "GET",
            "url": "/api/kegiatan/:kegiatanId",
            "input": {},
            "desc": "get kegiatan by kegiatanId"
        },
        "/api/kegiatan/:kegiatanId": {
            "method": "PUT",
            "url": "/api/kegiatan/:kegiatanId",
            "input": {
                "Y_LATITUDE":-2.392641
            },
            "desc": "update kegiatan"
        },
    },

}


const test_get = async (req, res) => {
    try {
        const servDateTime = appCurrentDateTime()

        return res.json({
            isSuccess: true,
            payload: {
                appName: CF.app.name,
                port: CF.server.port,
                environment: CF.server.ENV,
                appVersion: CF.app.version,
                serverDate: servDateTime.strDate,
                serverTime: servDateTime.serverTime,
                random: Math.random()
            },
            api: api
        })
    } catch (err) {
        return res.status(500).send(err)
    }
}

// -----------------------------------------------------------------------------
module.exports = {
    test_get
}
