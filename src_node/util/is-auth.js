//
//
const jwt = require('jsonwebtoken')
const CF = require('../conf/conf_app')


exports.authentication = (req, res, next) => {
    if (!CF.jwt.isAuth) {
        console.log("isAuth false")
        next()
    } else {
        let access_token = req.headers['authorization']
        // console.log(access_token)

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

            // console.log("this is the payload of access token", payload)
            res.user = payload
            next()
        }
    }
}

// getting access token using refresh token
exports.GetnewAccessToken = (req, res) => {
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
