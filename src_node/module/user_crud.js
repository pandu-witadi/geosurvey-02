//
//
const { passwordHash, comparePassword } = require('../util/bcrypt')
const { createToken, decodeToken } = require('../util/jwt')
const User = require('../model/User')


// --- register ---
const register = async (req, res) => {
    let { email, username, password, ...otherKeys } =  req.body

    if (!email || !password || !username ) {
        return res.status(200).json({
            isSuccess: false,
            message: "email or password or username not exist"
        })
    }

    email = email.trim()
    password = password.trim()
    username = username.trim()

    let userExst = await User.findOne({ email: email })
    if (userExst) {
        return res.status(200).json({
            isSuccess: false,
            message: "email already registered"
        })
    }

    let hashPassword = await await passwordHash(password)
    console.log(password, hashPassword)
    try {
        const obj = new User({
            email: email,
            password: hashPassword,
            username: username,
            ...otherKeys
        })
        let user = await obj.save()
        return res.status(201).json({
            isSuccess:  !!user,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            isSuccess: false,
            message: error.message
        })
    }
}

// --- login ---
const login = async (req, res) => {
    let { email, password, ...otherKeys } =  req.body

    if (!email || !password ) {
        return res.status(200).json({
            isSuccess: false,
            message: "email or password not exist"
        })
    }

    email = email.trim()
    password = password.trim()

    let user = await User.findOne({ email: email })
    if (!user) {
        return res.status(200).json({
            isSuccess: false,
            message: "email not exist"
        })
    }

    let match = await comparePassword(password, user.password)
    if (!match) {
        return res.status(200).json({
            isSuccess: false,
            message:"password incorrect"
        })
    }

    const accessToken = createToken({
        email: user.email,
        userId: user._id,
        role : user.role
    })
    user.token = accessToken
    user = await user.save()
    
    return res.status(201).json({
        isSuccess:  !!user,
        data: user
    })

}


// -----------------------------------------------------------------------------
module.exports = {
    register,
    login
}
