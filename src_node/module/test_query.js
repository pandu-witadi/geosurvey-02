//
//
const CF = require('../conf/conf_app')
const { appCurrentDateTime } = require('../util/time_format')


let api = {
    "test": {
        "GET   /api/test": {
            "method": "GET",
            "input": {},
            "desc": "test get check server health and API"
        },
        "GET   /api/test/auth": {
            "method": "GET",
            "input": {},
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "desc": "test get check server health and API"
        }
    },
    "user": {
        "GET   /api/user/q-find-all": {
            "goal": "Query - list",
            "input": {},
            "desc": "list all user"
        },
        "GET   /api/user/:userId": {
            "goal": "Query - readById",
            "input": {},
            "desc": "query single user"
        },
        "POST   /api/user/register": {
            "goal": "CRUD - create",
            "url": "/api/user/register",
            "input": {
                "email": "user101@mail.com",
                "password": "user101",
                "username": "user101"
            },
            "desc": "user register"
        },
        "POST   /api/user/login": {
            "goal": "Query - login",
            "url": "/api/user/login",
            "input": {
            	"email": "user101@mail.com",
            	"password": "user101"
            },
            "desc": "user login"
        },
        "PUT   /api/user/:userId": {
            "goal": "CRUD - update",
            "input": {
                "email": "",
                "username": "",
                "role": "kontraktor",
                "active": false
            },
            "desc": "update kegiatan by kegiatanId"
        },
        "DELETE   /api/user/:userId": {
            "goal": "CRUD - delete",
            "headers": {
                "Authorization": "Bearer {jwt_token}"
            },
            "input": {},
            "desc": "delete user by userId"
        },
    },
    "dashboard": {
        "kegiatan": {
            "POST   /api/dashboard/kegiatan": {
                "goal": "Query - find_select",
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
                "desc": "select dashboard Kegiatan"
            },
        },
        "studi": {
            "POST   /api/dashboard/studi": {
                "goal": "Query - find_select",
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
                "desc": "select dashboard Studi"
            },
        },


    },
    "geospatial": {
        "POST   /api/geospatial/WK": {
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
        "POST   /api/geospatial/titik-kegiatan": {
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
        "POST   /api/geospatial/titik-studi": {
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
        "kegiatan": {
            "GET   /api/WK/kegiatan/q_find-all": {
                "goal": "Query - find_all",
                "url": "/api/WK/kegiatan/q_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get WK Kegiatan find-all"
            },
            "GET  /api/WK/kegiatan/q-s_find-all": {
                "goal": "Query - find_all_summary",
                "url": "/api/WK/kegiatan/q-s_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get WK Kegiatan find-all summary"
            },
        },
        "studi": {
            "GET  /api/WK/studi/q_find-all": {
                "goal": "Query - find_all",
                "url": "/api/WK/studi/q_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get WK studi find-all"
            },
            "GET   /api/WK/studi/q-s_find-all": {
                "goal": "Query - find_all_summary",
                "url": "/api/WK/studi/q-s_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get WK studi find-all summary"
            },
        },
    },
    "holding": {
        "kegiatan": {
            "GET   /api/holding/kegiatan/q_find-all": {
                "goal": "Query - find_all",
                "url": "/api/holding/kegiatan/q_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get holding Kegiatan find-all"
            },
            "GET   /api/holding/kegiatan/q-s_find-all": {
                "goal": "Query - find_all_summary",
                "url": "/api/holding/kegiatan/q-s_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get holding Kegiatan find-all summary"
            },
        },
        "studi": {
            "GET   /api/holding/studi/q_find-all": {
                "goal": "Query - find_all",
                "url": "/api/holding/studi/q_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get holding studi find-all"
            },
            "GET   /api/holding/studi/q-s_find-all": {
                "goal": "Query - find_all_summary",
                "url": "/api/holding/studi/q-s_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get holding studi find-all summary"
            },
        },
    },
    "KKKS": {
        "kegiatan": {
            "GET   /api/KKKS/kegiatan/q_find-all": {
                "goal": "Query - find_all",
                "url": "/api/KKKS/kegiatan/q_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get KKKS Kegiatan find-all"
            },
            "GET   /api/KKKS/kegiatan/q-s_find-all": {
                "goal": "Query - find_all_summary",
                "url": "/api/KKKS/kegiatan/q-s_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get KKKS Kegiatan find-all summary"
            },
        },
        "studi": {
            "GET   /api/KKKS/studi/q_find-all": {
                "goal": "Query - find_all",
                "url": "/api/KKKS/studi/q_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get KKKS studi find-all"
            },
            "GET   /api/KKKS/studi/q-s_find-all": {
                "goal": "Query - find_all_summary",
                "url": "/api/KKKS/studi/q-s_find-all",
                "input": {},
                "headers": {
                    "Authorization": "Bearer {jwt_token}"
                },
                "desc": "get KKKS studi find-all summary"
            },
        },
    },

    "studi": {
        "POST   /api/studi/q_select": {
            "goal": "Query - find_select",
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
            "desc": "select list studi"
        },
        "POST  /api/studi": {
            "goal": "CRUD - create",
            "url": "/api/studi",
            "input": {
                "NAMA_STUDI": "test",

            },
            "desc": "create studi"
        },
        "GET   /api/studi/:studiId": {
            "goal": "CRUD - read",
            "url": "/api/studi/:studiId",
            "input": {},
            "desc": "get studi by studiId"
        },
        "PUT   /api/studi/:studiId": {
            "goal": "CRUD - update",
            "url": "/api/studi/:studiId",
            "input": {
                "NO_AFE": "1229-6373"
            },
            "desc": "update studi by studiId"
        },
        "DELETE   /api/studi/:studiId": {
            "goal": "CRUD - delete",
            "url": "/api/studi/:studiId",
            "input": {},
            "desc": "delete studi by studiId"
        },
    },
    "kegiatan": {
        "POST  /api/kegiatan/q_select": {
            "url": "/api/kegiatan/q_select",
            "goal": "Query - find_select",
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
            "desc": "select list kegiatan"
        },
        "POST  /api/kegiatan": {
            "goal": "CRUD - create",
            "url": "/api/kegiatan",
            "input": {
                "NAMA_KEGIATAN": "test",

            },
            "desc": "create kegiatan"
        },
        "GET   /api/kegiatan/:kegiatanId": {
            "goal": "CRUD - read",
            "url": "/api/kegiatan/:kegiatanId",
            "input": {},
            "desc": "get kegiatan by kegiatanId"
        },
        "PUT   /api/kegiatan/:kegiatanId": {
            "goal": "CRUD - update",
            "url": "/api/kegiatan/:kegiatanId",
            "input": {
                "Y_LATITUDE":-2.392641
            },
            "desc": "update kegiatan by kegiatanId"
        },
        "DELETE   /api/kegiatan/:kegiatanId": {
            "goal": "CRUD - delete",
            "url": "/api/kegiatan/:kegiatanId",
            "input": {},
            "desc": "delete kegiatan by kegiatanId"
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
                random: Math.random(),
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
