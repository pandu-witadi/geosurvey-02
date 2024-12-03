//
//
const Kegiatan = require('../model/Kegiatan')
const { ExcelDateToJSDate } = require("../util/time_format")


const create_info = (obj) => {

    const curDateTime = new Date()

    let info = {
        TAHUN: obj['TAHUN'] || 0,
        NAMA_KEGIATAN: obj['NAMA_KEGIATAN'] || "",
        WK: obj['WK'] || "",
        STATUS_WK: obj['STATUS_WK'] || "",
        KKKS: obj['KKKS'] || "",
        HOLDING: obj['HOLDING'] || "",
        LABEL: obj['LABEL'] || "",

        STATUS_USULAN_PROGRAM: obj['STATUS_USULAN_PROGRAM'] || "",
        JENIS_KEGIATAN: obj['JENIS_KEGIATAN'] || "",
        JENIS_KOMITMEN: obj['JENIS_KOMITMEN'] || "",
        JENIS_TAHAPAN_KEGIATAN: obj['JENIS_TAHAPAN_KEGIATAN'] || "",
        AREA_KEGIATAN: obj['AREA_KEGIATAN'] || "",

        STATUS_PERSETUJUAN_TEKNIS: obj['STATUS_PERSETUJUAN_TEKNIS'] || "",
        TIPE_KONTRAK: obj['TIPE_KONTRAK'] || "",
        STATUS_BUNDLING: obj['STATUS_BUNDLING'] || "",
        NO_AFE: obj['NO_AFE'] || "",
        NILAI_AFE_INVESTASI: obj['NILAI_AFE_INVESTASI'] || 0,
        STATUS_AFE_ONLINE: obj['STATUS_AFE_ONLINE'] || "",

        RENCANA_KUANTITAS_PEKERJAAN: obj['RENCANA_KUANTITAS_PEKERJAAN'] || 0,
        RENCANA_WAKTU_MULAI: ExcelDateToJSDate(obj['RENCANA_WAKTU_MULAI']) ||  new Date(),
        RENCANA_WAKTU_SELESAI: ExcelDateToJSDate(obj['RENCANA_WAKTU_SELESAI']) ||  new Date(),

        WILAYAH_INDONESIA: obj['WILAYAH_INDONESIA'] || "",
        PROVINSI: obj['PROVINSI'] || "",
        KENDALA_OPERASIONAL_LAPANGAN: obj['KENDALA_OPERASIONAL_LAPANGAN'] || "",
        REALISASI_STATUS_PELAKSANAAN: obj['REALISASI_STATUS_PELAKSANAAN'] || "",
        OUTLOOK_KEGIATAN: obj['OUTLOOK_KEGIATAN'] || "",

        REALISASI_WAKTU_MULAI: ExcelDateToJSDate(obj['REALISASI_WAKTU_MULAI']) || new Date(),
        REALISASI_WAKTU_SELESAI: ExcelDateToJSDate(obj['REALISASI_WAKTU_SELESAI']) ||  new Date(),

        REALISASI_KUANTITAS_PEKERJAAN: obj['REALISASI_KUANTITAS_PEKERJAAN'] || 0,
        P_REALISASI_KEGIATAN: obj['P_REALISASI_KEGIATAN'] || 0,
        REALISASI_AFE_INVESTASI: obj['REALISASI_AFE_INVESTASI'] || 0,
        P_REALISASI_AFE_INVESTASI: obj['P_REALISASI_AFE_INVESTASI'] || 0,

        TOPOGRAFI: obj['TOPOGRAFI'] || "",
        BRIDGING: obj['BRIDGING'] || "",
        OBJEKTIF: obj['OBJEKTIF'] || "",
        LINTASAN_MELALUI_SUMUR: obj['LINTASAN_MELALUI_SUMUR'] || "",
        NAMA_STRUKTUR_PNL: obj['NAMA_STRUKTUR_PNL'] || "",

        PROSPECT: obj['PROSPECT'] || 0,
        LEAD: obj['LEAD'] || 0,
        STATUS_RESOURCE_LAINNYA: obj['STATUS_RESOURCE_LAINNYA'] || 0,
        PLAY: obj['PLAY'] || "",
        RR_P50_OIL_MMBOE: obj['RR_P50_OIL_MMBOE'] || 0,
        RR_P50_GAS_BSCF: obj['RR_P50_GAS_BSCF'] || 0,
        RR_TOTAL_P50_MMBOE: obj['RR_TOTAL_P50_MMBOE'] || 0,

        FULL_FOLD: obj['FULL_FOLD'] || 0,
        NEAR_OFFSET_M: obj['NEAR_OFFSET_M'] || 0,
        FAR_OFFSET_M: obj['FAR_OFFSET_M'] || 0,
        SHOT_POINT_INTERVAL_M: obj['SHOT_POINT_INTERVAL_M'] || 0,
        RECEIVER_LINE_INTERVAL_M: obj['RECEIVER_LINE_INTERVAL_M'] || 0,
        JUMLAH_SHOT_POINT_ESTIMATED: obj['JUMLAH_SHOT_POINT_ESTIMATED'] || 0,
        SAMPLING_RATE_MS: obj['SAMPLING_RATE_MS'] || 0,
        RECORD_LENGTH_S: obj['RECORD_LENGTH_S'] || 0,
        PANJANG_STREAMER: obj['PANJANG_STREAMER'] || 0,
        JENIS_RECEIVER: obj['JENIS_RECEIVER'] || "",

        X_LONGITUDE: obj['X_LONGITUDE'] || 0,
        Y_LATITUDE: obj['Y_LATITUDE'] || 0,

        P_WPNB_WP_AFE_TEKNIS: obj['P_WPNB_WP_AFE_TEKNIS'] || 0,
        P_VALIDASI_PARAMETER_DESAIN: obj['P_VALIDASI_PARAMETER_DESAIN'] || 0,
        P_SURAT_PEMBERITAHUAN_PELAKSANAAN: obj['P_SURAT_PEMBERITAHUAN_PELAKSANAAN'] || 0,
        P_LIASON_OFFICE: obj['P_LIASON_OFFICE'] || 0,
        P_SERTIFIKAT_PERSONEL_SKNI: obj['P_SERTIFIKAT_PERSONEL_SKNI'] || 0,

        P_PROJECT_SUMMARY_MOM_SOW: obj['P_PROJECT_SUMMARY_MOM_SOW'] || 0,
        P_IZIN_HELIDECK: obj['P_IZIN_HELIDECK'] || 0,
        P_PPKA: obj['P_PPKA'] || 0,
        P_MAKLUMAT_PELAYARAN: obj['P_MAKLUMAT_PELAYARAN'] || 0,
        P_BERITA_PELAUT_INDONESIA: obj['P_BERITA_PELAUT_INDONESIA'] || 0,

        P_SCOUTING: obj['P_SCOUTING'] || 0,
        P_SOSIALISASI: obj['P_SOSIALISASI'] || 0,
        P_IZIN_PEMDA: obj['P_IZIN_PEMDA'] || 0,
        P_IZIN_PPKH: obj['P_IZIN_PPKH'] || 0,
        P_IZIN_UKL_UPL: obj['P_IZIN_UKL_UPL'] || 0,

        P_IZIN_INSTANSI_LAIN: obj['P_IZIN_INSTANSI_LAIN'] || 0,
        P_IZIN_K3S_LAIN: obj['P_IZIN_K3S_LAIN'] || 0,
        P_IZIN_OPEN_AREA: obj['P_IZIN_OPEN_AREA'] || 0,
        P_IZIN_PELEDAK: obj['P_IZIN_PELEDAK'] || 0,
        P_SECURITY_CLEARANCE: obj['P_SECURITY_CLEARANCE'] || 0,

        P_PENGADAAN_KONTRAKTOR_SURVEI: obj['P_PENGADAAN_KONTRAKTOR_SURVEI'] || 0,
        P_PENGADAAN_BAHAN_PELEDAK: obj['P_PENGADAAN_BAHAN_PELEDAK'] || 0,
        P_PENGADAAN_JASA_KENDALI_MUTU: obj['P_PENGADAAN_JASA_KENDALI_MUTU'] || 0,
        P_MOBILISASI: obj['P_MOBILISASI'] || 0,
        P_ADVANCE_PARTY: obj['P_ADVANCE_PARTY'] || 0,

        P_BASIC_PARTY: obj['P_BASIC_PARTY'] || 0,
        P_REKLAMASI: obj['P_REKLAMASI'] || 0,
        P_KOMPENSASI_GANTI_RUGI: obj['P_KOMPENSASI_GANTI_RUGI'] || 0,
        P_BASIC_PARTY: obj['P_DEMOBILISASI'] || 0,

    }



    return info
}

// --- create ---
const create = async (req, res) => {
    let { NAMA_KEGIATAN, ...otherKeys } =  req.body

    if (!NAMA_KEGIATAN) {
        return res.status(200).json({
            isSuccess: false,
            message: "NAMA_KEGIATAN not exist"
        })
    }

    let objExst = await Kegiatan.findOne({ name: NAMA_KEGIATAN })
    if (objExst) {
        return res.status(200).json({
            isSuccess: false,
            message: "NAMA_KEGIATAN already registered"
        })
    }

    try {
        let info = create_info(req.body)
        const obj = new Kegiatan({
            name: NAMA_KEGIATAN,
            info: info
        })
        let kegiatan = await obj.save()
        return res.status(201).json({
            isSuccess:  !!kegiatan,
            data: kegiatan
        })
    } catch (error) {
        return res.status(400).json({
            isSuccess: false,
            message: error.message
        })
    }

    return req.body
}


// --- read ---
const readById = async ( req, res) => {
    let { kegiatanId } = req.params
    if (!kegiatanId)
        return res.status(200).json({
            isSuccess: false,
            message: "kegiatanId not available"
        })

    try {
        let obj = await Kegiatan.findById(kegiatanId)

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

// --- update ---
const update = async ( req, res) => {
    let { kegiatanId } = req.params
    // console.log("PUT " + kegiatanId)

    let update_info = {}
    for (const key of Object.keys(req.body)) {
        if (req.body[key] !== '') {
            console.log(key, req.body[key])
            if (typeof req.body[key] === 'object' && !Array.isArray(req.body[key]) && key == "pupos") {
                for (let nestKey of Object.keys(req.body[key])) {
                    console.log(` --- ${key}.${nestKey}`, req.body[key][nestKey])
                    update_info[`${key}.${nestKey}`] =  req.body[key][nestKey]
                }

            } else
                update_info['info.' + key] = req.body[key]
        }
    }
    // console.log(update_info)

    try {
        let filter =  { _id: kegiatanId }
        let kegiatan = await Kegiatan.findOneAndUpdate(filter,
            { $set: update_info },
            {
                new: true,            // Return the updated document
                runValidators: true,  // Run schema validations
            }
        )
        // console.log(kegiatan)
        kegiatan = await Kegiatan.findById(kegiatanId)

        return res.status(200).json({
            isSuccess: true,
            data: kegiatan
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
    let { kegiatanId } = req.params
    try {
        let obj = await Kegiatan.findById(kegiatanId)
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




// -----------------------------------------------------------------------------
module.exports = {
    create,
    update,
    readById,
    deleteById
}
