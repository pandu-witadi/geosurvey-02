//
//
const WKKegiatan = require('../model/WKKegiatan')
const KKKSKegiatan = require('../model/KKKSKegiatan')
const Kegiatan = require('../model/Kegiatan')


const find_all_doc = async (params) => {
    let {
        par_project_sort,
        par_project_select,
        par_KKKS_sort,
        par_KKKS_select,
        par_WK_sort,
        par_WK_select,
    } = params

    par_project_sort = par_project_sort || {}
    par_project_select = par_project_select || {}
    par_KKKS_sort = par_KKKS_sort || {}
    par_KKKS_select = par_KKKS_select || {}
    par_WK_sort = par_WK_sort || {}
    par_WK_select = par_WK_select || {}

    let list_project = await  Kegiatan.find().sort(par_project_sort).select(par_project_select)
    let list_KKKS = await  KKKSKegiatan.find().sort(par_KKKS_sort).select(par_KKKS_select)
    let list_WK = await  WKKegiatan.find().sort(par_WK_sort).select(par_WK_select)

    return {
        list_project: list_project,
        list_KKKS: list_KKKS,
        list_WK: list_WK
    }

}


const  create_summary_cards = (
    list_project_length,
    count_Seismik_2D,
    count_Seismik_3D,
    length_Seismik_2D,
    area_Seismik_3D,
    total_resource,
    total_investasi,
    total_actual_cost
) => {

    return {
        "total_project" : {
            "title": "Total Projects",
            "val": list_project_length,
            "percYTD": 3.0,
            "note": "from last year",
            "tipe": {
                "Seismik_2D": {
                    "title": "Seismik 2D",
                    "val": count_Seismik_2D,
                },
                "Seismik_3D": {
                    "title": "Seismik 3D",
                    "val": count_Seismik_3D,
                }
            }
        },
        "total_panjang_lintasan" : {
            "title": "Total Panjang Lintasan (km)",
            "val": length_Seismik_2D,
            "percYTD": 3.0,
        },
        "total_luasan_volume" : {
            "title": "Total Luasan Volume (km2)",
            "val": area_Seismik_3D,
            "percYTD": 4.2,
        },
        "total_resource" : {
            "title": "Total Resource (MMBoE)",
            "val": total_resource,
            "percYTD": 3.2,
        },
        "total_investasi" : {
            "title": "Total Invest Cost ($)",
            "val": total_investasi,
            "percYTD": 5.7,
        },
        "total_actual_cost" : {
            "title": "Total Actual Cost ($)",
            "val": total_actual_cost,
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
    // create obj
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
            obj["Seismik 2D"]["RENCANA_PEKERJAAN"] += list[i].info.RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB
        } else if ( a.localeCompare("Seismik 3D") == 0 ) {
            obj["Seismik 3D"]["REALISASI_PEKERJAAN"] += list[i].info.REALISASI_KUANTITAS_PEKERJAAN
            obj["Seismik 3D"]["RENCANA_PEKERJAAN"] += list[i].info.RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB
        } else {
            obj["Survey Lainnya"]["REALISASI_PEKERJAAN"] += list[i].info.REALISASI_KUANTITAS_PEKERJAAN
            obj["Survey Lainnya"]["RENCANA_PEKERJAAN"] += list[i].info.RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB
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

    // create obj
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
            obj["Seismik 2D"]["Actual Cost"] += b.info.REALISASI_BIAYA_AFE
            if (b.info.TIPE_KONTRAK === 'PSC') {
                obj["Seismik 2D"]["Budget Cost"] += b.info.NILAI_AFE
            } else if (b.info.TIPE_KONTRAK === 'GS') {
                obj["Seismik 2D"]["Budget Cost"] += b.info.NILAI_INVESTASI
            }
        } else if ( a.localeCompare("Seismik 3D") == 0 ) {
            obj["Seismik 3D"]["Actual Cost"] += b.info.REALISASI_BIAYA_AFE
            if (b.info.TIPE_KONTRAK === 'PSC') {
                obj["Seismik 3D"]["Budget Cost"] += b.info.NILAI_AFE
            } else if (b.info.TIPE_KONTRAK === 'GS') {
                obj["Seismik 3D"]["Budget Cost"] += b.info.NILAI_INVESTASI
            }
        } else {
            obj["Survey Lainnya"]["Actual Cost"] += b.info.REALISASI_BIAYA_AFE
            if (b.info.TIPE_KONTRAK === 'PSC') {
                obj["Survey Lainnya"]["Budget Cost"] += b.info.NILAI_AFE
            } else if (b.info.TIPE_KONTRAK === 'GS') {
                obj["Survey Lainnya"]["Budget Cost"] += b.info.NILAI_INVESTASI
            }
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



const date2str_year_Q = (datetime) => {
    let tDT = new Date(datetime)
    return tDT.getFullYear() + "-" + Math.ceil((tDT.getMonth() + 1) / 3)
}

const conv_date2q = (datetime) => {
    let tDT = new Date(datetime)
    return 4*tDT.getFullYear() + Math.ceil((tDT.getMonth() + 1) / 3)
}




const trend_budget_cost_vs_actual_cost = (list) => {

    // create list_tmp of
    let list_tmp = []
    let project = null

    let budget = 0, actual = 0
    let ST_DATE = new Date("2500")  // MAX Date
    let EN_DATE = new Date("1971")  // MIN Date

    for (let i=0; i<list.length; i++) {
        project = list[i]
        if (project.info.TIPE_KONTRAK === 'PSC') {
             budget = project.info.NILAI_AFE
             actual = project.info.REALISASI_BIAYA_AFE
        } else if (project.info.TIPE_KONTRAK === 'GS') {
            budget = project.info.NILAI_INVESTASI
            actual = project.info.REALISASI_BIAYA_AFE
        }

        if (!!project.info.RENCANA_WAKTU_MULAI && !!project.info.RENCANA_WAKTU_MULAI
            && !!project.info.REALISASI_WAKTU_MULAI && !!project.info.REALISASI_WAKTU_SELESAI
        ) {

            if (ST_DATE > project.info.RENCANA_WAKTU_MULAI)
                ST_DATE = project.info.RENCANA_WAKTU_MULAI
            if (ST_DATE > project.info.RENCANA_WAKTU_SELESAI)
                ST_DATE = project.info.RENCANA_WAKTU_SELESAI
            if (ST_DATE > project.info.REALISASI_WAKTU_MULAI)
                ST_DATE = project.info.REALISASI_WAKTU_MULAI
            if (ST_DATE > project.info.REALISASI_WAKTU_SELESAI)
                ST_DATE = project.info.REALISASI_WAKTU_SELESAI

            if (EN_DATE < project.info.RENCANA_WAKTU_MULAI)
                EN_DATE = project.info.RENCANA_WAKTU_MULAI
            if (EN_DATE < project.info.RENCANA_WAKTU_SELESAI)
                EN_DATE = project.info.RENCANA_WAKTU_SELESAI
            if (EN_DATE < project.info.REALISASI_WAKTU_MULAI)
                EN_DATE = project.info.REALISASI_WAKTU_MULAI
            if (EN_DATE < project.info.REALISASI_WAKTU_SELESAI)
                EN_DATE = project.info.REALISASI_WAKTU_SELESAI


            list_tmp.push({
                "_id": project._id.toString(),
                name: project.name,
                TIPE_KONTRAK: project.info.TIPE_KONTRAK,
                budget:  budget,
                actual: actual,

                bud_st_dt: project.info.RENCANA_WAKTU_MULAI,
                bud_st_sq: date2str_year_Q(project.info.RENCANA_WAKTU_MULAI),
                bud_st_nq: conv_date2q(project.info.RENCANA_WAKTU_MULAI),

                bud_en_dt: project.info.RENCANA_WAKTU_SELESAI,
                bud_en_sq: date2str_year_Q(project.info.RENCANA_WAKTU_SELESAI),
                bud_en_nq: conv_date2q(project.info.RENCANA_WAKTU_SELESAI),

                act_st_dt: project.info.REALISASI_WAKTU_MULAI,
                act_st_sq: date2str_year_Q(project.info.REALISASI_WAKTU_MULAI),
                act_st_nq: conv_date2q(project.info.REALISASI_WAKTU_MULAI),


                act_en_dt: project.info.REALISASI_WAKTU_SELESAI,
                act_en_sq: date2str_year_Q(project.info.REALISASI_WAKTU_SELESAI),
                act_en_nq: conv_date2q(project.info.REALISASI_WAKTU_SELESAI)
            })
        }
    }

    // create array of Quarter time
    let st_q = conv_date2q(ST_DATE)
    let en_q = conv_date2q(EN_DATE)

    let list_q = []
    i_q = st_q
    let yyy = 0
    do {
        yyy = Math.floor((i_q-1)/4)
        if (i_q <= en_q) {
            list_q.push({
                nq: i_q,
                str_q: yyy + '-' + (i_q-(4*yyy)),
                budget: 0,
                actual: 0
            })
            i_q += 1
        } else {
            break
        }
    } while (true)


    for (let i=0; i<list_q.length; i++) {
        for (let j=0; j<list_tmp.length; j++) {
            if (list_tmp[j].bud_st_nq <= list_q[i].nq && list_q[i].nq <= list_tmp[j].bud_en_nq) {
                list_q[i].budget +=  list_tmp[j].budget
            }
            if (list_tmp[j].act_st_nq <= list_q[i].nq && list_q[i].nq <= list_tmp[j].act_en_nq) {
                list_q[i].actual +=  list_tmp[j].actual
            }
        }
    }

    return list_q

}


const create_dashboard = (list_project, list_KKKS, list_WK, num_top_watch) => {

    // create Summary of list_project
    let list_project_summary = []
    let count_Seismik_2D = 0
    let count_Seismik_3D = 0
    let length_Seismik_2D = 0
    let area_Seismik_3D = 0
    let total_resource = 0
    let total_investasi = 0
    let total_actual_cost = 0

    let project = null

    for (let i=0; i<list_project.length; i++) {

        project = list_project[i]

        if (project.info.JENIS_KEGIATAN === 'Seismik 2D') {
            count_Seismik_2D += 1
            length_Seismik_2D += project.info.REALISASI_KUANTITAS_PEKERJAAN
        } else if (project.info.JENIS_KEGIATAN === 'Seismik 3D') {
            count_Seismik_3D += 1
            area_Seismik_3D += project.info.REALISASI_KUANTITAS_PEKERJAAN
        }

        if (project.info.TIPE_KONTRAK === 'PSC') {
             project.calc.TOTAL_INVESTASI = project.info.NILAI_AFE
        } else if (project.info.TIPE_KONTRAK === 'GS') {
             project.calc.TOTAL_INVESTASI = project.info.NILAI_INVESTASI
        }

        list_project_summary.push({
            "_id": project._id.toString(),
            name: project.name,
            NILAI_INVESTASI:  project.calc.TOTAL_INVESTASI,
            JENIS_KEGIATAN: project.info.JENIS_KEGIATAN,
            HOLDING: project.info.HOLDING,
            YEAR: project.info.YEAR,
            WK: project.info.WK
        })

        total_resource += project.info.TOTAL_RESOURCE
        total_investasi += project.calc.TOTAL_INVESTASI
        total_actual_cost += project.info.TOTAL_ACTUAL_COST

        // console.log(project.info.TOTAL_RESOURCE, project.name)
    }

    // show 6 top_watch
    let top_watch = list_project_summary.sort((a, b) => parseFloat(b['NILAI_INVESTASI']) - parseFloat(a['NILAI_INVESTASI'])).slice(0, num_top_watch)

    let res_total_rencana_vs_realisasi_pekerjaan = total_rencana_vs_realisasi_pekerjaan(list_project)
    let res_total_budget_vs_actual_cost = total_budget_vs_actual_cost(list_project)

    let obj = {
        "info_upper": create_summary_cards(list_project.length, count_Seismik_2D, count_Seismik_3D, length_Seismik_2D, area_Seismik_3D, total_resource, total_investasi, total_actual_cost),
        "top_watch": top_watch,
        "status_kegiatan": create_status_kegiatan(list_project),
        "status_usulan_program": create_status_usulan_program(list_project),
        "status_usulan_program_jenis_komitmen": create_status_usulan_program_jenis_komitmen(list_project),
        "total_rencana_vs_realisasi_pekerjaan": res_total_rencana_vs_realisasi_pekerjaan,
        "persentase_rencana_vs_realisasi_pekerjaan": persentase_rencana_vs_realisasi_pekerjaan(res_total_rencana_vs_realisasi_pekerjaan),
        "trend_budget_cost_vs_actual_cost": trend_budget_cost_vs_actual_cost(list_project),
        "total_budget_vs_actual_cost": res_total_budget_vs_actual_cost,
        "persentase_total_budget_vs_actual_cost": persentase_total_budget_vs_actual_cost(res_total_budget_vs_actual_cost),
    }
    return obj
}



const info_all = async (req, res) => {

    let {
        list_project,
        list_KKKS,
        list_WK
    } = await find_all_doc({})

    let obj = create_dashboard(list_project, list_KKKS, list_WK, 5)
    return res.status(200).json(obj)
}



const info_select = async (req, res) => {
    try {
        let list_KKKS = await  KKKSKegiatan.find().sort({}).select({})
        let list_WK = await  WKKegiatan.find().sort({}).select({})

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

        let list_project  = await Kegiatan.find(criteria)

        let obj = create_dashboard(list_project, list_KKKS, list_WK, 5)
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
    // info_all,
    info_select
}
