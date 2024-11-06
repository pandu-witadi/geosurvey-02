//
//
const router = require('express').Router()
const { authentication } = require('../util/is-auth')


const { find_all } = require("../module/kegiatan_query")
router.get('/q_find-all', authentication, find_all)

const { find_all_summary } = require("../module/kegiatan_query")
router.get('/q-s_find-all', authentication, find_all_summary)

const { find_by_select } = require("../module/kegiatan_query")
router.post('/q_select', authentication, find_by_select)

const { find_by_id } = require("../module/kegiatan_query")
router.post('/q_select', authentication, find_by_id)

const { update } = require("../module/kegiatan_crud")
router.put('/:kegiatanId', authentication, update)



module.exports = router
