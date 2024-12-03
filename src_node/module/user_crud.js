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

// --- read ---
const readById = async ( req, res) => {
    let { userId } = req.params
    if (!userId)
        return res.status(200).json({
            isSuccess: false,
            message: "userId not available"
        })

    try {
        let obj = await User.findById(userId)

        return res.status(200).json({
            isSuccess: true,
            data: obj
        })

    } catch (error) {
        return res.status(200).json({
            isSuccess: false,
            message: error.message
        })
    }
}

// --- delete ---
const deleteById = async ( req, res) => {
    let { userId } = req.params
    try {
        let obj = await User.findById(userId)
        if (obj) {
            await obj.deleteOne()
            return res.status(200).json({
                isSuccess: true,
                data: obj
            })
        } else {
            return res.status(200).json({
                isSuccess: false,
                message: "error"
            })
        }


    } catch (error) {
        return res.status(200).json({
            isSuccess: false,
            message: error.message
        })
    }
}


// --- update ---
const update = async ( req, res) => {
    let { userId } = req.params
    let update_info = req.body

    if (update_info.password) {
        update_info.password = await passwordHash(update_info.password)
    }

    try {
        let filter =  { _id: userId }
        let kegiatan = await User.findOneAndUpdate(filter,
            { $set: update_info },
            {
                new: true,            // Return the updated document
                runValidators: true,  // Run schema validations
            }
        )
        // console.log(kegiatan)
        user = await User.findById(userId)

        return res.status(200).json({
            isSuccess: true,
            data: user
        })

    } catch (error) {
        return res.status(200).json({
            isSuccess: false,
            message: error.message
        })
    }
}
// -----------------------------------------------------------------------------
module.exports = {
    register,
    login,
    readById,
    deleteById,
    update
}
