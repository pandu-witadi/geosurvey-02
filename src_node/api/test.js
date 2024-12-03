//
//
const router = require('express').Router()
const { authentication, checkACLstr } = require('../util/is-auth')


const { test_get } = require("../module/test_query")
router.get('/', test_get)

router.get('/auth', authentication, checkACLstr(['user']), test_get)


module.exports = router
