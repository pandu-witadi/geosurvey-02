//
//
const router = require('express').Router()
const { authentication, checkACLstr } = require('../util/is-auth')


const { create_randomId } = require("../module/file_crud")
router.get('/randomId', create_randomId)

const { upload_file_kegiatan_thumbnail } = require("../module/file_crud")
router.post('/kegiatan/thumbnail/create', upload_file_kegiatan_thumbnail)

const { delete_file_kegiatan_thumbnail } = require("../module/file_crud")
router.post('/kegiatan/thumbnail/delete', delete_file_kegiatan_thumbnail)


module.exports = router
