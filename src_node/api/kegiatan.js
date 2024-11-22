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


// crud
const { create } = require("../module/kegiatan_crud")
router.post('/', authentication, create)

const { readById } = require("../module/kegiatan_crud")
router.get('/:kegiatanId', authentication, readById)

const { update } = require("../module/kegiatan_crud")
router.put('/:kegiatanId', authentication, update)

const { deleteById } = require("../module/kegiatan_crud")
router.delete('/:kegiatanId', authentication, deleteById)



module.exports = router
