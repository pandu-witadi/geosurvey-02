//
//
const WKStudi = require('../model/WKStudi')
const KKKSStudi = require('../model/KKKSStudi')
const Studi = require('../model/Studi')


function getQuarterlyStrings(startDate, endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const quarters = []
    while (start <= end) {
        const year = start.getFullYear()
        const quarter = Math.ceil((start.getMonth() + 1) / 3)
        quarters.push(`${year}-${quarter}`)
        start.setMonth(start.getMonth() + 3)
    }
    return quarters
}

const comp_date = (t_st_en, st_d, en_d) => {
    const st = new Date(st_d)
    const en = new Date(en_d)

     if (!t_st_en.st_d ) {
         t_st_en.st_d = st
     } else {
         if (t_st_en.st_d.getTime() > st.getTime()) {
             t_st_en.st_d = st
         }
     }
     if (!t_st_en.en_d) {
         t_st_en.en_d = en
     } else {
         if (t_st_en.en_d.getTime() < en.getTime()) {
             t_st_en.en_d = en
         }
     }

     return t_st_en
}


const  create_summary_cards = (
    list_studi_length,
    t_sc_stat,
    count_Analisa_Lab,
    count_Reprocessing
) => {
    return {
        "total_studi": {
            "title": "Total Studi",
            "val":     list_studi_length,
            "percYTD": 3.0,
            "note": "from last year",
            "tipe": {
                "Studi_Prospektivitas": {
                    "title": "Studi_Prospektivitas",
                    "val": t_sc_stat.Studi_Prospektivitas.tot,
                },
                "Studi_MNK": {
                    "title": "Studi MNK",
                    "val": t_sc_stat.Studi_MNK.tot,
                },
                "Analisa_Lab": {
                    "title": "Analisa Lab",
                    "val": t_sc_stat.Analisa_Lab.tot,
                },
                "Reprocessing": {
                    "title": "Reprocessing",
                    "val": t_sc_stat.Reprocessing.tot,
                }
            }
        },
        "realisasi_studi": {
            "title": "Total Studi",
            "val": t_sc_stat.tot,
            "percYTD": 3.0,
            "note": "from last year",
            "tipe": {
                "Studi_Prospektivitas": {
                    "title": "Studi Prospektivitas",
                    "val": t_sc_stat.Studi_Prospektivitas.sedang_berjalan + t_sc_stat.Studi_Prospektivitas.selesai,
                },
                "Studi_MNK": {
                    "title": "Studi MNK",
                    "val":  t_sc_stat.Studi_MNK.sedang_berjalan + t_sc_stat.Studi_MNK.selesai,
                },
                "Analisa_Lab": {
                    "title": "Analisa Lab",
                    "val": t_sc_stat.Analisa_Lab.sedang_berjalan + t_sc_stat.Analisa_Lab.selesai,
                },
                "Reprocessing": {
                    "title": "Reprocessing",
                    "val": t_sc_stat.Reprocessing.sedang_berjalan + t_sc_stat.Reprocessing.selesai,
                }
            }
        },
        "RR_TOTAL": {
            "title": "RR Total",
            "val": t_sc_stat.total_RR_MMBOE,
            "tipe": {
                // "Studi_Prospektivitas": {
                //     "title": "Studi Prospektivitas",
                //     "val": t_sc_stat.Studi_Prospektivitas.RR_MMBOE,
                // },
                "Studi_MNK": {
                    "title": "Studi MNK",
                    "val":  t_sc_stat.Studi_MNK.RR_MMBOE,
                },
                "Analisa_Lab": {
                    "title": "Analisa Lab",
                    "val": t_sc_stat.Analisa_Lab.RR_MMBOE,
                },
                "Reprocessing": {
                    "title": "Reprocessing",
                    "val": t_sc_stat.Reprocessing.RR_MMBOE
                }
            }
        },
        "total_investasi" : {
            "title": "Total Invest Cost ($)",
            "val": t_sc_stat.total_invest,
            "percYTD": 0,
        },
        "total_actual_cost" : {
            "title": "Total Actual Cost ($)",
            "val": t_sc_stat.actual_cost,
            "percYTD": 0,
        }
    }
}


const calc_total_rencana_vs_realisasi_pekerjaan = (t_sc_stat) => {
    return {
        "Lab Analysis": {
            "Plan Qty": t_sc_stat.Analisa_Lab.tot,
            "Actual Qty":t_sc_stat.Analisa_Lab.sedang_berjalan + t_sc_stat.Analisa_Lab.selesai
        },
        "Reprocessing": {
            "Plan Qty": t_sc_stat.Reprocessing.tot,
            "Actual Qty":t_sc_stat.Reprocessing.sedang_berjalan + t_sc_stat.Reprocessing.selesai
        },
        "Studi MNK": {
            "Plan Qty": t_sc_stat.Studi_MNK.tot,
            "Actual Qty":t_sc_stat.Studi_MNK.sedang_berjalan + t_sc_stat.Studi_MNK.selesai
        },
        "Studi Prospektivitas": {
            "Plan Qty": t_sc_stat.Studi_Prospektivitas.tot,
            "Actual Qty":t_sc_stat.Studi_Prospektivitas.sedang_berjalan + t_sc_stat.Studi_Prospektivitas.selesai
        }
    }
}


const calc_total_budget_vs_actual_cost = (t_sc_stat) => {
    return {
        "Studi Prospektivitas": {
            "Budget Cost": t_sc_stat.Studi_Prospektivitas.budget_cost,
            "Actual Cost":t_sc_stat.Studi_Prospektivitas.actual_cost
        },
        "Studi MNK": {
            "Budget Cost": t_sc_stat.Studi_MNK.budget_cost,
            "Actual Cost":t_sc_stat.Studi_MNK.actual_cost
        },
        "Lab Analysis": {
            "Budget Cost": t_sc_stat.Analisa_Lab.budget_cost,
            "Actual Cost":t_sc_stat.Analisa_Lab.actual_cost
        },
        "Reprocessing": {
            "Budget Cost": t_sc_stat.Reprocessing.budget_cost,
            "Actual Cost":t_sc_stat.Reprocessing.actual_cost
        },
    }
}

const create_dashboard =  (list_studi) => {

    let t_sc_stat = {
        total_RR_MMBOE: 0,
        total_invest: 0,
        actual_cost: 0,
        tot: 0,
        Studi_Prospektivitas: {
            batal: 0,
            belum_mulai: 0,
            sedang_berjalan: 0,
            selesai: 0,
            tot: 0,
            RR_MMBOE: 0,
            budget_cost: 0,
            actual_cost: 0
        },
        Studi_MNK: {
            batal: 0,
            belum_mulai: 0,
            sedang_berjalan: 0,
            selesai: 0,
            tot: 0,
            RR_MMBOE: 0,
            budget_cost: 0,
            actual_cost: 0
        },
        Analisa_Lab: {
            batal: 0,
            belum_mulai: 0,
            sedang_berjalan: 0,
            selesai: 0,
            tot: 0,
            RR_MMBOE: 0,
            budget_cost: 0,
            actual_cost: 0
        },
        Reprocessing: {
            batal: 0,
            belum_mulai: 0,
            sedang_berjalan: 0,
            selesai: 0,
            tot: 0,
            RR_MMBOE: 0,
            budget_cost: 0,
            actual_cost: 0
        },
    }

    let tt_rencana = 0, tt_realisasi = 0
    let tt1 = null, tt2 = null
    let l_summ_RR_MMBOE = [], l_sum_invest_cost = []

    let quarter_plan = null, quarter_actual = null
    let l_s_arr_q = []
    let t_st_en = {
        st_d: null,
        en_d: null
    }

    for (let i=0; i<list_studi.length; i++) {
        obj = list_studi[i]

        // top_watch
        l_summ_RR_MMBOE.push({
            "_id": obj._id.toString(),
            name: obj.name,
            RR_MMBOE: obj.info.RR_MMBOE
        })
        l_sum_invest_cost.push({
            "_id": obj._id.toString(),
            name: obj.name,
            RENCANA_ANGGARAN_AFE_INVESTASI: obj.info.RENCANA_ANGGARAN_AFE_INVESTASI
        })

        tt_RR_MMBOE = obj.info.RR_MMBOE
        if (tt_RR_MMBOE)
            t_sc_stat.total_RR_MMBOE += tt_RR_MMBOE

        tt_rencana = obj.info.RENCANA_ANGGARAN_AFE_INVESTASI
        tt_realisasi = obj.info.REALISASI_ANGGARAN_AFE_INVESTASI



        if (tt_rencana)
            t_sc_stat.total_invest += tt_rencana
        if (tt_realisasi)
            t_sc_stat.actual_cost += tt_realisasi

        tt1 = obj.info.TIPE_STUDI
        tt2 = obj.info.REALISASI_STATUS_PELAKSANAAN.split('-')[0]
        tt2 = tt2.trim()

        // console.log('\"'+tt1+'\"')

        if (tt1 === 'Studi Prospektivitas') {
            t_sc_stat.Studi_Prospektivitas.tot += 1
            if ( tt2 == "Batal" ) {
                t_sc_stat.Studi_Prospektivitas.batal += 1
            } else if (tt2 == "Belum Mulai" ) {
                t_sc_stat.Studi_Prospektivitas.belum_mulai += 1
            } else if (tt2 == "Sedang Berjalan" ) {
                t_sc_stat.Studi_Prospektivitas.sedang_berjalan += 1
            } else if (tt2 == "Selesai" ) {
                t_sc_stat.Studi_Prospektivitas.selesai += 1
            }

            if (tt_RR_MMBOE) {
                t_sc_stat.Studi_Prospektivitas.RR_MMBOE += tt_RR_MMBOE
            }

            if (tt_rencana) {
                t_sc_stat.Studi_Prospektivitas.budget_cost += tt_rencana
            }
            if (tt_realisasi) {
                t_sc_stat.Studi_Prospektivitas.actual_cost += tt_realisasi
            }

        } else if (tt1 === 'Studi MNK') {
            t_sc_stat.Studi_MNK.tot += 1
            if ( tt2 == "Batal" ) {
                t_sc_stat.Studi_MNK.batal += 1
            } else if (tt2 == "Belum Mulai" ) {
                t_sc_stat.Studi_MNK.belum_mulai += 1
            } else if ( tt2 == "Sedang Berjalan" ) {
                t_sc_stat.Studi_MNK.sedang_berjalan += 1
            } else if (tt2 == "Selesai" ) {
                t_sc_stat.Studi_MNK.selesai += 1
            }

            if (tt_RR_MMBOE) {
                t_sc_stat.Studi_MNK.RR_MMBOE += tt_RR_MMBOE
            }

            if (tt_rencana) {
                t_sc_stat.Studi_MNK.budget_cost += tt_rencana
            }
            if (tt_realisasi) {
                t_sc_stat.Studi_MNK.actual_cost += tt_realisasi
            }

        } else if (tt1 === 'Lab Analysis') {
            t_sc_stat.Analisa_Lab.tot += 1
            if ( tt2 == "Batal") {
                t_sc_stat.Analisa_Lab.batal += 1
            } else if (tt2 == "Belum Mulai" ) {
                t_sc_stat.Analisa_Lab.belum_mulai += 1
            } else if (tt2 == "Sedang Berjalan" ) {
                t_sc_stat.Analisa_Lab.sedang_berjalan += 1
            } else if (tt2 == "Selesai" ) {
                t_sc_stat.Analisa_Lab.selesai += 1
            }

            if (tt_RR_MMBOE) {
                t_sc_stat.Analisa_Lab.RR_MMBOE += tt_RR_MMBOE
            }

            if (tt_rencana) {
                t_sc_stat.Analisa_Lab.budget_cost += tt_rencana
            }
            if (tt_realisasi) {
                t_sc_stat.Analisa_Lab.actual_cost += tt_realisasi
            }

        } else if (tt1 === 'Reprocessing') {
            t_sc_stat.Reprocessing.tot += 1
            if ( tt2 == "Batal" ) {
                t_sc_stat.Reprocessing.batal += 1
            } else if (tt2 == "Belum Mulai" ) {
                t_sc_stat.Reprocessing.belum_mulai += 1
            } else if (tt2 == "Sedang Berjalan" ) {
                t_sc_stat.Reprocessing.sedang_berjalan += 1
            } else if (tt2 == "Selesai" ) {
                t_sc_stat.Reprocessing.selesai += 1
            }

            if (tt_RR_MMBOE) {
                t_sc_stat.Reprocessing.RR_MMBOE += tt_RR_MMBOE
            }

            if (tt_rencana) {
                t_sc_stat.Reprocessing.budget_cost += tt_rencana
            }
            if (tt_realisasi) {
                t_sc_stat.Reprocessing.actual_cost += tt_realisasi
            }
        }

        // s-curve
        quarter_plan = null
        if (obj.info.RENCANA_WAKTU_MULAI && obj.info.RENCANA_WAKTU_SELESAI ) {
            quarter_plan = getQuarterlyStrings(obj.info.RENCANA_WAKTU_MULAI, obj.info.RENCANA_WAKTU_SELESAI),
            t_st_en = comp_date(t_st_en, obj.info.RENCANA_WAKTU_MULAI, obj.info.RENCANA_WAKTU_SELESAI)
        }

        quarter_actual = null
        if (obj.info.REALISASI_WAKTU_MULAI && obj.info.REALISASI_WAKTU_SELESAI
            && (tt2 == "Sedang Berjalan" || tt2 == "Selesai")
        ) {
            quarter_actual = getQuarterlyStrings(obj.info.REALISASI_WAKTU_MULAI, obj.info.REALISASI_WAKTU_SELESAI)
            t_st_en = comp_date(t_st_en, obj.info.REALISASI_WAKTU_MULAI, obj.info.REALISASI_WAKTU_SELESAI)
        }

        l_s_arr_q.push({
            "_id": obj._id.toString(),
            name: obj.name,
            quarter_plan: quarter_plan,
            quarter_actual: quarter_actual,
            budget_cost: tt_rencana,
            actual_cost: tt_realisasi
        })    
    }


    t_sc_stat.tot =
            t_sc_stat.Studi_Prospektivitas.sedang_berjalan + t_sc_stat.Studi_Prospektivitas.selesai +
            t_sc_stat.Studi_MNK.sedang_berjalan + t_sc_stat.Studi_MNK.selesai +
            t_sc_stat.Analisa_Lab.sedang_berjalan + t_sc_stat.Analisa_Lab.selesai +
            t_sc_stat.Reprocessing.sedang_berjalan + t_sc_stat.Reprocessing.selesai

    num_top_watch = 6
    let top_watch = {
        "RR_MMBOE": l_summ_RR_MMBOE.sort((a, b) => parseFloat(b['RR_MMBOE']) - parseFloat(a['RR_MMBOE'])).slice(0, Math.min(num_top_watch, l_summ_RR_MMBOE.length)),
        "invest_cost":  l_sum_invest_cost.sort((a, b) => parseFloat(b['RENCANA_ANGGARAN_AFE_INVESTASI']) - parseFloat(a['RENCANA_ANGGARAN_AFE_INVESTASI'])).slice(0, Math.min(num_top_watch, l_sum_invest_cost.length))
    }

    let arr_q = getQuarterlyStrings(t_st_en.st_d, t_st_en.en_d)
    let l_s_curve = []

    for (let i=0; i<arr_q.length; i++) {
        q = arr_q[i]
        l_s_curve.push({
            time_q: q,

            cnt_plan: 0,
            cnt_actual: 0,
            cnt_plan_acc: 0,
            cnt_actual_acc: 0,

            budget_cost: 0,
            actual_cost: 0,
            budget_cost_acc: 0,
            actual_cost_acc: 0
        })
    }

    for (let i=0; i<l_s_curve.length; i++) {

        q = l_s_curve[i].time_q
        for (let j=0; j<l_s_arr_q.length; j++) {
            q_plan = l_s_arr_q[j].quarter_plan
            q_actual = l_s_arr_q[j].quarter_actual
            if (q_plan && q_plan.includes(q)) {
                l_s_curve[i].cnt_plan += (1/q_plan.length)
                l_s_curve[i].budget_cost += (l_s_arr_q[j].budget_cost/q_plan.length)
            }
            if (q_actual && q_actual.includes(q)) {
                l_s_curve[i].cnt_actual += (1/q_actual.length)
                l_s_curve[i].actual_cost += (l_s_arr_q[j].actual_cost/q_actual.length)
            }
        }

    }

    /// s-curve accumulative
    let l_s_curve_cnt = [], l_s_curve_cost = []
    for (let i=0; i<l_s_curve.length; i++) {
        // console.log(l_s_curve[i])
        for (let j=0; j<=i; j++) {
            l_s_curve[i].cnt_plan_acc += l_s_curve[j].cnt_plan
            l_s_curve[i].cnt_actual_acc += l_s_curve[j].cnt_actual

            l_s_curve[i].budget_cost_acc += l_s_curve[j].budget_cost
            l_s_curve[i].actual_cost_acc += l_s_curve[j].actual_cost
        }
        l_s_curve_cnt.push({
            time_q: l_s_curve[i].time_q,
            cnt_plan_acc: l_s_curve[i].cnt_plan_acc,
            cnt_actual_acc: l_s_curve[i].cnt_actual_acc,
        })
        l_s_curve_cost.push({
            time_q: l_s_curve[i].time_q,
            budget_cost_acc: l_s_curve[i].budget_cost_acc,
            actual_cost_acc: l_s_curve[i].actual_cost_acc,
        })
    }



    let tmp = {
        "info_upper": create_summary_cards(list_studi.length, t_sc_stat),
        "top_watch": top_watch,
        "s_curve_rencana_vs_realisasi_jumlah_studi": l_s_curve_cnt,
        "total_rencana_vs_realisasi_pekerjaan": calc_total_rencana_vs_realisasi_pekerjaan(t_sc_stat),
        "s_curve_rencana_vs_realisasi_cost": l_s_curve_cost,
        "total_budget_vs_actual_cost": calc_total_budget_vs_actual_cost(t_sc_stat)
    }
    return tmp
}


const info_select = async (req, res) => {
    try {
        let list_KKKS = await  KKKSStudi.find().sort({}).select({})
        let list_WK = await  WKStudi.find().sort({}).select({})

        let { arr_TAHUN, arr_TIPE_STUDI, arr_HOLDING, arr_WK  } = req.body

        let tmp = []

        if (arr_TAHUN && arr_TAHUN.length > 0)
            tmp.push({ "info.TAHUN" : { $in: arr_TAHUN } })

        if (arr_TIPE_STUDI && arr_TIPE_STUDI.length > 0)
            tmp.push({ "info.TIPE_STUDI" : { $in: arr_TIPE_STUDI } })

        if (arr_HOLDING && arr_HOLDING.length > 0)
            tmp.push({ "info.HOLDING" : { $in: arr_HOLDING } })

        if (arr_WK && arr_WK.length > 0)
                tmp.push({ "info.WK" : { $in: arr_WK } })


        let criteria = {}
        if (tmp.length > 0)
            criteria = { $and: tmp }

        let list_obj  = await Studi.find(criteria)
        let obj =  create_dashboard(list_obj)
        return res.status(200).json({
            isSuccess: true,
            data: obj,
            // tmp: list_obj
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
    info_select
}
