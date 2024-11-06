//
//
//
const jwt = require('jsonwebtoken')
const CF = require('../conf/conf_app')



const createToken = (jwt_obj) => {
    return jwt.sign(
        jwt_obj,
        CF.jwt.accessToken,
        { expiresIn: CF.jwt.accessTokenLife }
    )
}

const decodeToken = (accessToken) => {
    return jwt.verify(accessToken, CF.jwt.accessToken)
}

module.exports = {
    createToken,
    decodeToken
}
