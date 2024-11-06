//
//
const router = require('express').Router()
const { authentication } = require('../util/is-auth')


const { find_all } = require("../module/user_query")
router.get('/q-find-all', authentication, find_all)

const { find_all_brief } = require("../module/user_query")
router.get('/q-find-all-brief', authentication, find_all_brief)


const { register, login } = require("../module/user_crud")
router.post('/register', register)
router.post('/login', login)


module.exports = router
