//
//
const router = require('express').Router()
const { authentication } = require('../util/is-auth')


const { find_all } = require("../module/studi_query")
router.get('/q_find-all', authentication, find_all)

const { find_all_summary } = require("../module/studi_query")
router.get('/q-s_find-all', authentication, find_all_summary)

const { find_by_select } = require("../module/studi_query")
router.post('/q_select', authentication, find_by_select)


// crud
const { create } = require("../module/studi_crud")
router.post('/', authentication, create)

const { readById } = require("../module/studi_crud")
router.get('/:studiId', authentication, readById)

const { update } = require("../module/studi_crud")
router.put('/:studiId', authentication, update)

const { deleteById } = require("../module/studi_crud")
router.delete('/:studiId', authentication, deleteById)



module.exports = router
