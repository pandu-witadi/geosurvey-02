//
//
const router = require('express').Router()
const { authentication } = require('../util/is-auth')


const { find_all: find_all_kegiatan } = require("../module/holding_kegiatan_query")
router.get('/kegiatan/q_find-all', authentication, find_all_kegiatan)

const { find_all_summary: find_all_summary_kegiatan } = require("../module/holding_kegiatan_query")
router.get('/kegiatan/q_find-all', authentication, find_all_kegiatan)


const { find_all: find_all_studi } = require("../module/holding_studi_query")
router.get('/studi/q_find-all', authentication, find_all_studi)

const { find_all_summary: find_all_summary_studi } = require("../module/holding_studi_query")
router.get('/studi/q-s_find-all', authentication, find_all_summary_studi)


module.exports = router
