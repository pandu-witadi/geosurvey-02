//
//

function createRandomLetters({totalChar=2}) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    // Generate the first two random letters
    return Array.from({length: totalChar}, () => letters[Math.floor(Math.random() * letters.length)]).join('')
}

function createRandomDigits({totalDigit=4}) {
    const digits = '0123456789'

    // Generate the first two random letters
    return Array.from({length: totalDigit}, () => digits[Math.floor(Math.random() * digits.length)]).join('')
}

function createRandomId ({totalChar = 2, totalDigit = 4}) {
    // Combine the letters and digits
    return createRandomLetters({totalChar: totalChar}) + createRandomDigits({totalDigit: totalDigit})
}



module.exports = {
    createRandomLetters,
    createRandomDigits,
    createRandomId
}
