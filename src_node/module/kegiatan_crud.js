//
//
const Kegiatan = require('../model/Kegiatan')



// NOT DONE : --- register ---
const register = async (req, res) => {
    let {
        FORM_ID,
        TAHUN,
        NAMA_KEGIATAN,
        WK,
        STATUS_WK,
        KKKS,
        HOLDING,
        STATUS_USULAN_PROGRAM,
        JENIS_KEGIATAN,
        JENIS_KOMITMEN,
        JENIS_TAHAPAN_KEGIATAN,
        AREA_KEGIATAN,
        STATUS_PERSETUJUAN_TEKNIS,
        TIPE_KONTRAK,
        STATUS_BUNDLING,
        NO_AFE,
        NILAI_AFE,
        NILAI_INVESTASI,
        STATUS_AFE_ONLINE,
        RENCANA_KUANTITAS_PEKERJAAN_TAHUN_WPNB,
        RENCANA_WAKTU_MULAI,
        RENCANA_WAKTU_SELESAI,
        REGION_SKK,
        PROVINSI,
        OBJEKTIF,
        LINTASAN_MELALUI_SUMUR,
        NAMA_STRUKTUR_PNL,
        PROSPECT,
        LEAD,
        STATUS_RESOURCE_LAINNYA,
        PLAY,
        RR_P50_OIL_MMBOE,
        RR_P50_GAS_BSCF,
        RR_TOTAL_P50_MMBOE,
        FULL_FOLD,
        NEAR_OFFSET_M,
        FAR_OFFSET_M,
        SHOT_POINT_INTERVAL_M,
        RECEIVER_LINE_INTERVAL_M,
        JUMLAH_SHOT_POINT_ESTIMATED,
        SAMPLING_RATE_MS,
        RECORD_LENGTH_S,
        PANJANG_STREAMER,
        X_LONGITUDE,
        Y_LATITUDE,
        ...otherKeys
    } =  req.body

    if (!NAMA_KEGIATAN) {
        return res.status(200).json({
            isSuccess: false,
            message: "JENIS_KEGIATAN not exist"
        })
    }

    let objExst = await Kegiatan.findOne({ NAMA_KEGIATAN: NAMA_KEGIATAN })
    if (objExst) {
        return res.status(200).json({
            isSuccess: false,
            message: "NAMA_KEGIATAN already registered"
        })
    }

    try {
        const obj = new Kegiatan({
            name: NAMA_KEGIATAN,
            info: req.body
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

// --- update ---
const update = async ( req, res) => {
    let { kegiatanId } = req.params
    // console.log("PUT " + kegiatanId)

    let update_info = {}
    for (const key of Object.keys(req.body)) {
        if (req.body[key] !== '') {
            update_info['info.' + key] = req.body[key]
        }
    }
    console.log(update_info)
    try {
        let filter =  { _id: kegiatanId }
        let kegiatan = await Kegiatan.findOneAndUpdate(filter, { $set: update_info }  )
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

















// -----------------------------------------------------------------------------
module.exports = {
    // register,
    update
}
