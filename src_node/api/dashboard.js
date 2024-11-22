//
//
const router = require('express').Router()
const { authentication } = require('../util/is-auth')



// const { info_all: info_all_kegiatan } = require("../module/dashboard_kegiatan_query")
// router.get('/kegiatan', authentication, info_all_kegiatan)
// router.get('/kegiatan', info_all_kegiatan)

const { info_select: info_select_kegiatan } = require("../module/dashboard_kegiatan_query")
router.post('/kegiatan', authentication, info_select_kegiatan )

const { info_select: info_select_studi } = require("../module/dashboard_studi_query")
router.post('/studi', authentication, info_select_studi )


module.exports = router
