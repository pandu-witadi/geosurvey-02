//
//
const router = require('express').Router()
const { authentication, checkACLstr } = require('../util/is-auth')


const { find_all } = require("../module/user_query")
router.get('/q-find-all', authentication, checkACLstr(["user", "admin"]), find_all)


// crud
const { register } = require("../module/user_crud")
router.post('/register', register)

const { readById } = require("../module/user_crud")
router.get('/:userId', authentication, checkACLstr(["user", "admin", "contractor"]), readById)

const { update } = require("../module/user_crud")
router.put('/:userId', authentication, checkACLstr(["admin"]), update)

const { deleteById } = require("../module/user_crud")
router.delete('/:userId', authentication, checkACLstr(["admin"]), deleteById)



// login
const { login } = require("../module/user_crud")
router.post('/login', login)


module.exports = router
