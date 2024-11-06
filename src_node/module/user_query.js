//
//
const User = require('../model/User')


const find_all = async () => {
    try {
        const obj = await User.find()
            .sort({ createdAt:1 })
        return {
            isSuccess: true,
            data: obj
        }

    } catch (error) {
        return {
            isSuccess: false,
            message: error.message
        }
    }
}

const find_all_brief = async () => {
    try {
        const obj = await User.find()
            .sort({ createdAt:1 })
            .select('_id username')
        return {
            isSuccess: true,
            data: obj
        }

    } catch (error) {
        return {
            isSuccess: false,
            message: error.message
        }
    }
}




// -----------------------------------------------------------------------------
module.exports = {
    find_all,
    find_all_brief
}
