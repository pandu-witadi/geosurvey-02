//
//
const mongoose = require('mongoose')
const Schema = Mongoose.Schema


const objSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        desc: String,
        perc: Number,
        dt_st_plan: {
            type : Date,
            default: Date.now
        },
        dt_en_plan: {
            type : Date,
            default: Date.now
        },
        dt_st_actual: {
            type : Date,
            default: Date.now
        },
        dt_en_actual: {
            type : Date,
            default: Date.now
        },
    },
    {
        collection: 'gantt_task'
    }
)


module.exports = mongoose.model('GanttTask', objSchema)
