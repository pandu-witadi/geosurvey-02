# 00-test-script.js
# from main directory with arguments
node src_node/script/00-test-script.js  aa bb 10


# 01-scan-xls.js
# arg 0 : node
# arg 1 : script read js
# arg 2 : relative directory
# arg 3 : filename
# node src_node/script/01-scan-xls.js "../data" "2024-08-30_KSSG_2024_SKK_db.xlsx"
# node src_node/script/01-scan-xls.js "../data" "2024-10-01_LSKNK_2024_v2.xlsx"


# 02-scan-xls-sheet.js
# arg 0 : node
# arg 1 : script read js
# arg 2 : relative directory
# arg 3 : filename
# arg 4 : target sheet name
# node src_node/script/01-scan-xls.js "../data" "2024-08-30_KSSG_2024_SKK_db.xlsx"
# node src_node/script/02-scan-xls-sheet.js "../data" "2024-10-01_LSKNK_2024_v2.xlsx" "Monitoring Studi"


# -----------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------

# arg 0 : node
# arg 1 : script read js
# arg 2 : relative directory
# arg 3 : filename
# arg 4 : target sheet name
# arg 5 : target column name
# 13-read-xls-sheet-WK.js
node src_node/script/11-read-xls-sheet-WK-Kegiatan.js "../data" "2024-08-30_KSSG_2024_SKK_db.xlsx" "Survey" "WK"

# 23-read-xls-sheet-WK.js
node src_node/script/21-read-xls-sheet-WK-Studi.js    "../data" "2024-10-01_LSKNK_2024_v2.xlsx" "Monitoring Studi" "WK"

# arg 0 : node
# arg 1 : script read js
# arg 2 : relative directory
# arg 3 : filename
# arg 4 : target sheet name
# arg 5 : target column name
# 14-read-xls-sheet-Holding-Kegiatan.js
node src_node/script/12-read-xls-sheet-Holding-Kegiatan.js "../data" "2024-08-30_KSSG_2024_SKK_db.xlsx" "Survey" "HOLDING"

# 24-read-xls-sheet-Holding-Studi.js
node src_node/script/22-read-xls-sheet-Holding-Studi.js    "../data" "2024-10-01_LSKNK_2024_v2.xlsx" "Monitoring Studi" "HOLDING"


# arg 0 : node
# arg 1 : script read js
# arg 2 : relative directory
# arg 3 : filename
# arg 4 : target sheet name
# arg 5 : target column name
# 15-read-xls-sheet-KKKS-Kegiatan.js
node src_node/script/13-read-xls-sheet-KKKS-Kegiatan.js "../data" "2024-08-30_KSSG_2024_SKK_db.xlsx" "Survey" "KKKS"

# 25-read-xls-sheet-KKKS-Kegiatan.js
node src_node/script/23-read-xls-sheet-KKKS-Studi.js    "../data" "2024-10-01_LSKNK_2024_v2.xlsx" "Monitoring Studi" "KKKS"


# arg 0 : node
# arg 1 : script read js
# arg 2 : relative directory
# arg 3 : filename
# arg 4 : target sheet name
# arg 5 : target column name
# 16-read-xls-sheet-Kegiatan.js
node src_node/script/14-read-xls-sheet-Kegiatan.js "../data" "2024-08-30_KSSG_2024_SKK_db.xlsx" "Survey" "NAMA_KEGIATAN"

# 26-read-xls-sheet-Studi.js
node src_node/script/24-read-xls-sheet-Studi.js "../data" "2024-10-01_LSKNK_2024_v2.xlsx" "Monitoring Studi" "NAMA_STUDI"



# arg 0 : node
# arg 1 : script read js
# arg 2 : relative directory
# arg 3 : filename
# arg 4 : target column name
# 15-read-geojson-titik-Kegiatan.js
node src_node/script/15-read-geojson-titik-Kegiatan.js "../data" "Geospatial_Titik_Survei_SKK_Migas_2024_Kegiatan.geojson" "NAMA_KEGIATAN"

# 15-read-geojson-titik-Kegiatan.js
node src_node/script/25-read-geojson-titik-Studi.js "../data" "Geospatial_Titik_Survei_SKK_Migas_2024_Studi.geojson" "NAMA_STUDI"


# arg 0 : node
# arg 1 : script read js
# arg 2 : relative directory
# arg 3 : filename
# arg 4 : target column name
# 05-read-geojson-WK.js
node src_node/script/05-read-geojson-WK.js "../data" "Geospatial_WK_Migas_Indonesia_Juni_2024.geojson" "WK"

# -----------------------------------------------------------------------------------------------
# -----------------------------------------------------------------------------------------------
