//
//
const fs = require('fs')

function checkDirectoryExists(directoryPath) {
    return fs.existsSync(directoryPath) && fs.lstatSync(directoryPath).isDirectory()
}

function createDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true })
        // console.log(`Directory '${directoryPath}' created.`);
    } else {
        // console.log(`Directory '${directoryPath}' already exists.`);
    }
}

function cleanFileName(filename) {
    // Remove spaces and symbols, allowing only alphanumeric characters and dots for file extensions
    return filename.replace(/[^a-zA-Z0-9.]/g, '');
}

function moveFileToPath(destinationPath, filename) {
    filename.mv(destinationPath, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("... successfully uploaded ... " + destinationPath)
        }
    })
}

function deleteDirectory(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.rmSync(directoryPath, { recursive: true, force: true });
    } else {
    }
}

function deleteStringFromArray(array, stringToDelete) {
    // Find the index of the string to delete in the array
    const index = array.indexOf(stringToDelete)

    // If the string is found, remove it from the array
    if (index > -1) {
        array.splice(index, 1)
    } else {
        // Optional: handle the case where the string is not found
        console.log("String not found in the array.")
    }

    return array
}



module.exports = {
    checkDirectoryExists,
    createDirectory,
    cleanFileName,
    moveFileToPath,
    deleteDirectory,
    deleteStringFromArray
}
