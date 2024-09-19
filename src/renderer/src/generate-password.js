export function generatePassword(passwordChars, style, passwordSize) {
    const minor = passwordChars.find(item => item === "minor");
    const major = passwordChars.find(item => item === "major");
    const numbers = passwordChars.find(item => item === "numbers");
    const symbols = passwordChars.find(item => item === "symbols");

    // Definição dos alfabetos
    const alphabetMinor = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const alphatbetMajor = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const alphabetNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const alphabetSymbols = ["!", "@", "#", "$", "%", "&", "*", "(", ")", "/", "-", "_", "[", "]", "=", "+", ">", "<"]

    let usedAlphabet = [];

    if (minor) {
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetMinor);
    }
    if (major) {
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphatbetMajor);
    }
    if (numbers) {
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetNumbers);
    }
    if (symbols) {
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetSymbols);
    }

    let pwd = "";
    for (let i = 0; i < passwordSize && (usedAlphabet.length > 0); i++) {
        let character = usedAlphabet[Math.floor(Math.random() * usedAlphabet.length)]

        while (style === 2 && ["I", "l", "1", "0", "o", "O"].includes(character)) {
            character = usedAlphabet[Math.floor(Math.random() * usedAlphabet.length)];
        }

        pwd += character;
    }

    return pwd
}