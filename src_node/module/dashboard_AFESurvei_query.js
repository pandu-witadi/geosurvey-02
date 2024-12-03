//
//
const AFESurvei = require('../model/AFESurvei')


const  create_summary_cards = (list_project_length, t_sc_stat) => {
    return {
        "total_project" : {
            "title": "Total Projects",
            "val": list_project_length,
            "percYTD": 3.0,
            "note": "from last year",
            "tipe": {
                "Seismik_2D": {
                    "title": "Seismik 2D",
                    "val": t_sc_stat.tipe.Seismic_2D.cnt,
                },
                "Seismik_3D": {
                    "title": "Seismik 3D",
                    "val": t_sc_stat.tipe.Seismic_3D.cnt,
                }
            }
        },
        "total_panjang_lintasan" : {
            "title": "Total Panjang Lintasan (km)",
            "val": t_sc_stat.tipe.Seismic_2D.length,
            "percYTD": 3.0,
        },
        "total_luasan_volume" : {
            "title": "Total Luasan Volume (km2)",
            "val": t_sc_stat.tipe.Seismic_3D.area,
            "percYTD": 4.2,
        },
        "total_resource" : {
            "title": "Total Resource (MMBoE)",
            "val": t_sc_stat.total_resource,
            "percYTD": 3.2,
        },
        "total_investasi" : {
            "title": "Total Invest Cost ($)",
            "val": t_sc_stat.total_investasi,
            "percYTD": 5.7,
        },
        "total_actual_cost" : {
            "title": "Total Actual Cost ($)",
            "val": t_sc_stat.total_actual_cost,
            "percYTD": 6.0,
        }
    }
}

const create_status_kegiatan = (list) => {

    let val_unique = []
    for (let i=0; i<list.length; i++) {
        if (!!list[i].info.REALISASI_STATUS_PELAKSANAAN && !val_unique.includes(list[i].info.REALISASI_STATUS_PELAKSANAAN)) {
            val_unique.push(list[i].info.REALISASI_STATUS_PELAKSANAAN)
        }

    }

    // create obj
    let obj = {
        "Seismik 2D": {},
        "Seismik 3D": {},
        "Survey Lainnya": {}
    }
    // init obj
    for (let i=0; i < val_unique.length; i++) {
        obj["Seismik 2D"][val_unique[i]] = 0
        obj["Seismik 3D"][val_unique[i]] = 0
        obj["Survey Lainnya"][val_unique[i]] = 0
    }


    let a = "", b = ""
    for (let i=0; i< list.length; i++) {
        a = list[i].info.JENIS_KEGIATAN
        b = list[i].info.REALISASI_STATUS_PELAKSANAAN
        if ( a.localeCompare("Seismik 2D") == 0 ) {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Seismik 2D"][val_unique[j]] += 1
                }
            }
        } else if ( a.localeCompare("Seismik 3D") == 0 ) {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Seismik 3D"][val_unique[j]] += 1
                }
            }
        } else {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Survey Lainnya"][val_unique[j]] += 1
                }
            }
        }
    }
    return obj
}

const create_status_usulan_program = (list) => {
    // create obj
    let obj = {
        "Seismik 2D": {},
        "Seismik 3D": {},
        "Survey Lainnya": {}
    }

    let val_unique = []
    for (let i=0; i<list.length; i++) {
        if (!!list[i].info.STATUS_USULAN_PROGRAM && !val_unique.includes(list[i].info.STATUS_USULAN_PROGRAM)) {
            val_unique.push(list[i].info.STATUS_USULAN_PROGRAM)
        }
    }

    // init obj
    for (let i=0; i < val_unique.length; i++) {
        obj["Seismik 2D"][val_unique[i]] = 0
        obj["Seismik 3D"][val_unique[i]] = 0
        obj["Survey Lainnya"][val_unique[i]] = 0
    }


    let a = "", b = ""
    for (let i=0; i< list.length; i++) {
        a = list[i].info.JENIS_KEGIATAN
        b = list[i].info.STATUS_USULAN_PROGRAM
        if ( a.localeCompare("Seismik 2D") == 0 ) {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Seismik 2D"][val_unique[j]] += 1
                }
            }
        } else if ( a.localeCompare("Seismik 3D") == 0 ) {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Seismik 3D"][val_unique[j]] += 1
                }
            }
        } else {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Survey Lainnya"][val_unique[j]] += 1
                }
            }
        }
    }
    return obj
}

const create_status_usulan_program_jenis_komitmen = (list) => {
    // create obj
    let obj = {
        "Seismik 2D": {},
        "Seismik 3D": {},
        "Survey Lainnya": {}
    }

    let val_unique = []
    for (let i=0; i<list.length; i++) {
        if (!!list[i].info.JENIS_KOMITMEN && !val_unique.includes(list[i].info.JENIS_KOMITMEN)) {
            val_unique.push(list[i].info.JENIS_KOMITMEN)
        }
    }

    // init obj
    for (let i=0; i < val_unique.length; i++) {
        obj["Seismik 2D"][val_unique[i]] = 0
        obj["Seismik 3D"][val_unique[i]] = 0
        obj["Survey Lainnya"][val_unique[i]] = 0
    }

    let a = "", b = ""
    for (let i=0; i< list.length; i++) {
        a = list[i].info.JENIS_KEGIATAN
        b = list[i].info.JENIS_KOMITMEN
        if ( a.localeCompare("Seismik 2D") == 0 ) {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Seismik 2D"][val_unique[j]] += 1
                }
            }
        } else if ( a.localeCompare("Seismik 3D") == 0 ) {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Seismik 3D"][val_unique[j]] += 1
                }
            }
        } else {
            for (let j=0; j<val_unique.length; j++) {
                if (b.localeCompare(val_unique[j]) == 0) {
                    obj["Survey Lainnya"][val_unique[j]] += 1
                }
            }
        }
    }
    return obj
}


const total_rencana_vs_realisasi_pekerjaan = (list) => {
    let obj = {
        "Seismik 2D": {
            "REALISASI_PEKERJAAN": 0,
            "RENCANA_PEKERJAAN": 0
        },
        "Seismik 3D": {
            "REALISASI_PEKERJAAN": 0,
            "RENCANA_PEKERJAAN": 0
        },
        "Survey Lainnya": {
            "REALISASI_PEKERJAAN": 0,
            "RENCANA_PEKERJAAN": 0
        }
    }

    let a = "", b = ""
    for (let i=0; i<list.length; i++) {
        a = list[i].info.JENIS_KEGIATAN
        // b = list[i].info.JENIS_KOMITMEN
        if ( a.localeCompare("Seismik 2D") == 0 ) {
            obj["Seismik 2D"]["REALISASI_PEKERJAAN"] += list[i].info.REALISASI_KUANTITAS_PEKERJAAN
            obj["Seismik 2D"]["RENCANA_PEKERJAAN"] += list[i].info.RENCANA_KUANTITAS_PEKERJAAN
        } else if ( a.localeCompare("Seismik 3D") == 0 ) {
            obj["Seismik 3D"]["REALISASI_PEKERJAAN"] += list[i].info.REALISASI_KUANTITAS_PEKERJAAN
            obj["Seismik 3D"]["RENCANA_PEKERJAAN"] += list[i].info.RENCANA_KUANTITAS_PEKERJAAN
        } else {
            obj["Survey Lainnya"]["REALISASI_PEKERJAAN"] += list[i].info.REALISASI_KUANTITAS_PEKERJAAN
            obj["Survey Lainnya"]["RENCANA_PEKERJAAN"] += list[i].info.RENCANA_KUANTITAS_PEKERJAAN
        }
    }
    return obj
}


const persentase_rencana_vs_realisasi_pekerjaan = (obj) => {
    return {
        "Seismik 2D": obj["Seismik 2D"]["RENCANA_PEKERJAAN"] > 0 ? (100 * obj["Seismik 2D"]["REALISASI_PEKERJAAN"] / obj["Seismik 2D"]["RENCANA_PEKERJAAN"] ) : 0,
        "Seismik 3D": obj["Seismik 3D"]["RENCANA_PEKERJAAN"] > 0 ? (100 * obj["Seismik 3D"]["REALISASI_PEKERJAAN"] / obj["Seismik 3D"]["RENCANA_PEKERJAAN"] ) : 0,
        "Survey Lainnya": obj["Survey Lainnya"]["RENCANA_PEKERJAAN"] > 0 ? (100 * obj["Survey Lainnya"]["REALISASI_PEKERJAAN"] / obj["Survey Lainnya"]["RENCANA_PEKERJAAN"]) : 0
    }
}


const total_budget_vs_actual_cost = (list) => {
    let obj = {
        "Seismik 2D": {
            "Budget Cost": 0,
            "Actual Cost": 0
        },
        "Seismik 3D": {
            "Budget Cost": 0,
            "Actual Cost": 0
        },
        "Survey Lainnya": {
            "Budget Cost": 0,
            "Actual Cost": 0
        }
    }

    let a = "", b = null
    for (let i=0; i<list.length; i++) {
        a = list[i].info.JENIS_KEGIATAN
        b = list[i]
        // console.log(a, b.AFE)
        if ( a.localeCompare("Seismik 2D") == 0 ) {
            obj["Seismik 2D"]["Actual Cost"] += b.info.REALISASI_AFE_INVESTASI
            obj["Seismik 2D"]["Budget Cost"] += b.info.NILAI_AFE_INVESTASI
        } else if ( a.localeCompare("Seismik 3D") == 0 ) {
            obj["Seismik 3D"]["Actual Cost"] += b.info.REALISASI_AFE_INVESTASI
            obj["Seismik 3D"]["Budget Cost"] += b.info.NILAI_AFE_INVESTASI
        } else {
            obj["Survey Lainnya"]["Actual Cost"] += b.info.REALISASI_AFE_INVESTASI
            obj["Survey Lainnya"]["Budget Cost"] += b.info.NILAI_AFE_INVESTASI
        }
    }
    return obj
}

const persentase_total_budget_vs_actual_cost = (obj) => {
    return {
        "Seismik 2D": obj["Seismik 2D"]["Budget Cost"] > 0 ? (100 * obj["Seismik 2D"]["Actual Cost"] / obj["Seismik 2D"]["Budget Cost"] ) : 0,
        "Seismik 3D": obj["Seismik 3D"]["Budget Cost"] > 0 ? (100 * obj["Seismik 3D"]["Actual Cost"] / obj["Seismik 3D"]["Budget Cost"] ) : 0,
        "Survey Lainnya": obj["Survey Lainnya"]["Budget Cost"] > 0 ? (100 * obj["Survey Lainnya"]["Actual Cost"] / obj["Survey Lainnya"]["Budget Cost"]) : 0
    }
}


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


const calc_s_curve = (t_st_en, l_s_arr_q) => {
    let arr_q = getQuarterlyStrings(t_st_en.st_d, t_st_en.en_d)

    let l_s_curve = []
    let q = null
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

    let q_plan = null, q_actual = null
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
            str_q: l_s_curve[i].time_q,
            budget: l_s_curve[i].budget_cost_acc,
            actual: l_s_curve[i].actual_cost_acc,
        })
    }

    return {
        l_s_curve_cnt,
        l_s_curve_cost
    }
}

const create_dashboard = (list_obj) => {
    num_top_watch = 5
    let l_s_arr_q = []
    let t_st_en = {
        st_d: null,
        en_d: null
    }
    let budget = 0, actual = 0

    let t_sc_stat = {
        total_resource: 0,
        total_investasi: 0,
        total_actual_cost: 0,
        tipe: {
            Seismic_2D: {
                cnt: 0,
                length: 0
            },
            Seismic_3D: {
                cnt: 0,
                area: 0
            },
        }
    }

    // create Summary of list_project
    let list_project_summary = []
    let obj = null
    let t_tot_invest = 0
    for (let i=0; i<list_obj.length; i++) {

        obj = list_obj[i]

        if (obj.info.JENIS_KEGIATAN === 'Seismik 2D') {
            t_sc_stat.tipe.Seismic_2D.cnt += 1
            t_sc_stat.tipe.Seismic_2D.length += obj.info.REALISASI_KUANTITAS_PEKERJAAN || 0
        } else if (obj.info.JENIS_KEGIATAN === 'Seismik 3D') {
            t_sc_stat.tipe.Seismic_3D.cnt += 1
            t_sc_stat.tipe.Seismic_3D.area += obj.info.REALISASI_KUANTITAS_PEKERJAAN
        }

        t_tot_invest = obj.info.NILAI_AFE_INVESTASI || 0

        list_project_summary.push({
            "_id": obj._id.toString(),
            name: obj.name,
            NILAI_INVESTASI: t_tot_invest,
            JENIS_KEGIATAN: obj.info.JENIS_KEGIATAN,
            HOLDING: obj.info.HOLDING,
            YEAR: obj.info.TAHUN,
            WK: obj.info.WK
        })

        t_sc_stat.total_resource += (obj.info.RR_TOTAL_P50_MMBOE || 0)
        t_sc_stat.total_investasi += t_tot_invest
        t_sc_stat.total_actual_cost += ( obj.info.REALISASI_AFE_INVESTASI || 0 )

        // console.log(project.info.TOTAL_RESOURCE, project.name)

        // s-curve
        quarter_plan = null
        if (obj.info.RENCANA_WAKTU_MULAI && obj.info.RENCANA_WAKTU_SELESAI ) {
            quarter_plan = getQuarterlyStrings(obj.info.RENCANA_WAKTU_MULAI, obj.info.RENCANA_WAKTU_SELESAI),
            t_st_en = comp_date(t_st_en, obj.info.RENCANA_WAKTU_MULAI, obj.info.RENCANA_WAKTU_SELESAI)
        }

        quarter_actual = null
        if (obj.info.REALISASI_WAKTU_MULAI && obj.info.REALISASI_WAKTU_SELESAI) {
            quarter_actual = getQuarterlyStrings(obj.info.REALISASI_WAKTU_MULAI, obj.info.REALISASI_WAKTU_SELESAI)
            t_st_en = comp_date(t_st_en, obj.info.REALISASI_WAKTU_MULAI, obj.info.REALISASI_WAKTU_SELESAI)
        }

        if (quarter_plan && quarter_actual) {

            budget = obj.info.NILAI_AFE_INVESTASI || 0
            actual = obj.info.REALISASI_AFE_INVESTASI || 0

            l_s_arr_q.push({
                "_id": obj._id.toString(),
                name: obj.name,
                quarter_plan: quarter_plan,
                quarter_actual: quarter_actual,
                budget_cost: budget,
                actual_cost: actual
            })
        }
    }

    let { l_s_curve_cnt, l_s_curve_cost } = calc_s_curve(t_st_en, l_s_arr_q)

    // show 6 top_watch
    let top_watch = list_project_summary.sort((a, b) => parseFloat(b['NILAI_INVESTASI']) - parseFloat(a['NILAI_INVESTASI'])).slice(0, num_top_watch)

    let res_total_rencana_vs_realisasi_pekerjaan = total_rencana_vs_realisasi_pekerjaan(list_obj)
    let res_total_budget_vs_actual_cost = total_budget_vs_actual_cost(list_obj)

    let tmp = {

        "info_upper": create_summary_cards(list_obj.length, t_sc_stat),
        "top_watch": top_watch,
        "status_kegiatan": create_status_kegiatan(list_obj),
        "status_usulan_program": create_status_usulan_program(list_obj),
        "status_usulan_program_jenis_komitmen": create_status_usulan_program_jenis_komitmen(list_obj),
        "total_rencana_vs_realisasi_pekerjaan": res_total_rencana_vs_realisasi_pekerjaan,
        "persentase_rencana_vs_realisasi_pekerjaan": persentase_rencana_vs_realisasi_pekerjaan(res_total_rencana_vs_realisasi_pekerjaan),
        "trend_budget_cost_vs_actual_cost": l_s_curve_cost, //trend_budget_cost_vs_actual_cost(list_obj),
        "total_budget_vs_actual_cost": res_total_budget_vs_actual_cost,
        "persentase_total_budget_vs_actual_cost": persentase_total_budget_vs_actual_cost(res_total_budget_vs_actual_cost),
    }
    return tmp
}


const info_select = async (req, res) => {
    try {
        let { arr_TAHUN, arr_JENIS_KEGIATAN, arr_HOLDING, arr_WK  } = req.body
        let tmp = []

        if (arr_TAHUN && arr_TAHUN.length > 0)
            tmp.push({ "info.TAHUN" : { $in: arr_TAHUN } })

        if (arr_JENIS_KEGIATAN && arr_JENIS_KEGIATAN.length > 0)
            tmp.push({ "info.JENIS_KEGIATAN" : { $in: arr_JENIS_KEGIATAN } })

        if (arr_HOLDING && arr_HOLDING.length > 0)
            tmp.push({ "info.HOLDING" : { $in: arr_HOLDING } })

        if (arr_WK && arr_WK.length > 0)
                tmp.push({ "info.WK" : { $in: arr_WK } })

        let criteria = {}
        if (tmp.length > 0)
            criteria = { $and: tmp }

        let list_obj  = await AFESurvei.find(criteria)

        let obj = create_dashboard(list_obj)
        return res.status(200).json({
            isSuccess: true,
            data: obj,
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
