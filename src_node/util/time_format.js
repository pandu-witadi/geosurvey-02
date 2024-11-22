//
//


const appCurrentDateTime = () => {
    const curDateTime = new Date()
    let strDate =
            curDateTime.getFullYear() + "-" +
            ('0' + (curDateTime.getMonth() + 1)).slice(-2) + "-" +
            ('0' + curDateTime.getDate()).slice(-2)


    return {
        "strDate" : strDate,
        "serverTime": curDateTime.toLocaleTimeString()
    }
}

function ExcelDateToJSDate(serial) {
    if (serial) {
        let m = Date.parse(serial); //GMT date in milliseconds

        let mTZ = m + 9 * 3600 * 1000; //Asia/Tashkent +5 time zone. 18.000.000 = 5 hours in milliseconds.

        return new Date(mTZ);
    } else
        return null

}

module.exports = {
    appCurrentDateTime,
    ExcelDateToJSDate
}
