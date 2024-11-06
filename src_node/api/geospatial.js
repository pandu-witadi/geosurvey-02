//
//
const router = require('express').Router()
const { authentication } = require('../util/is-auth')


const { info_select_project: WK_info_select_project } = require("../module/geospatialWK_query")
router.post('/WK', authentication, WK_info_select_project)

const { info_select_project : titik_info_select_kegiatan } = require("../module/geospatial_titik_kegiatan_query")
router.post('/titik-kegiatan', authentication, titik_info_select_kegiatan)

const { info_select_project : titik_info_select_studi } = require("../module/geospatial_titik_studi_query")
router.post('/titik-studi', authentication, titik_info_select_studi)


module.exports = router
