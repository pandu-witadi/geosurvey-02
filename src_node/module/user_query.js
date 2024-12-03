//
//
const User = require('../model/User')


const find_all = async  (req, res) => {

    try {
        let obj = await User.find({}).sort({ createdAt:1 }).select('-password -token')
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




// -----------------------------------------------------------------------------
module.exports = {
    find_all,
    // find_all_brief
}
