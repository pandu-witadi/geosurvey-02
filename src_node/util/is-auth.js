//
//
const jwt = require('jsonwebtoken')
const CF = require('../conf/conf_app')

const User = require('../model/User')


const authentication = async (req, res, next) => {
    if (!CF.jwt.isAuth) {
        console.log("isAuth false")
        next()
    } else {
        let access_token = req.headers['authorization']
        console.log(access_token)

        if (!access_token) {
            return res.status(401).json({ message: "headers[AUthorization] not exist"})
        } else {

            let access = access_token.split(' ')[1]
            let payload = null
            // console.log(access)

            try {
                payload = jwt.verify(access, CF.jwt.accessToken)
            } catch(err) {
                return res.status(401).json({ messages: "not authenticated" })
            }


            let { password, __v, ...obj } = await User.findById(payload.userId).lean()
            if (!obj) {
                return res.status(401).json({ message: "userId not exist"})
            }


            req.user = obj
            // console.log(req.user)
            next()
        }
    }
}

// getting access token using refresh token
const GetnewAccessToken = (req, res) => {
   let refresh_token = req.body.refresh_token

   if (!refresh_token) {
      const error = new Error("not authenticated")
      error.statusCode = 401
      res.status(401).json({ message: "not authenticated" })
      throw error
   } else {
        jwt.verify(refresh_token, CF.jwt.refreshToken, function(err, decoded) {
            if (err) {
                const error = new Error("Not authenticated.")
                res.status(401).json({ messages: "not authenticated" })
                error.statusCode = 401
                throw error
            } else {
                const access_token=jwt.sign({email:decoded['email']}, CF.jwt.accessToken, {
                    algorithm: "HS256",
                    expiresIn: CF.jwt.accessTokenLife
                });

                const refresh_token = jwt.sign(
                    { email:decoded['email'] },
                    CF.jwt.refreshToken,
                    {
                        algorithm: "HS256",
                        expiresIn: CF.jwt.refreshTokenLife
                    }
                )

                return res.status(200).json({
                    message: "Fetched token successfully",
                    access_token: access_token,
                    refresh_token: refresh_token
                })
            }
        })
    }
}


const checkACLstr = (allowedRoles) => {
    return function (req, res, next) {
        if (!CF.jwt.isAuth) {
            console.log("isAuth false")
            next()
        } else {
            if (allowedRoles.includes(req.user.role )) {
                // User has at least one allowed role
                next()
            } else {
                // User does not have any of the allowed roles
                res.status(403).json({
                    isSuccess: false,
                    message: 'level [' + req.user.role + '] access denied'
                })
            }
        }

    }
}


const checkACLarr = (allowedRoles) => {
    return function (req, res, next) {
        const userRoles = req.user.role; // Assume req.user.role is an array of roles

        // Ensure userRoles is an array
        if (!Array.isArray(userRoles)) {
            return res.status(500).json({ message: 'User roles must be an array' });
        }

        // Check if there is any intersection between userRoles and allowedRoles
        const hasRole = userRoles.some((role) => allowedRoles.includes(role));

        if (hasRole) {
            // User has at least one allowed role
            next()
        } else {
            // User does not have any of the allowed roles
            res.status(403).json({
                isSuccess: false,
                message: 'access denied'
            })
        }
    }
}


// -----------------------------------------------------------------------------
module.exports = {
    authentication,
    GetnewAccessToken,
    checkACLstr
}
