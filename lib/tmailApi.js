const config = JSON.parse(require('fs').readFileSync('./config.json').toString());
const axios = require('axios');

async function createMail() {
    try {
const pip = await axios.get(`${config.tmail_url}/api/email/asbirgtg/${config.tmail_apikey}`)
        return pip.data;
    }
    catch (error) {
        console.log(error);
    }
}

const generateImei = (opsi) => {
    if (opsi === '4bln') {
        const base = '8683290703';

        // Generate the remaining 4 digits randomly
        let randomDigits = '';
        for (let i = 0; i < 4; i++) {
            randomDigits += Math.floor(Math.random() * 10);  // Add a random digit from 0-9
        }

        const fullBase = base + randomDigits;

        // Now calculate the checksum using the Luhn algorithm
        let sum = 0;
        for (let i = 0; i < fullBase.length; i++) {
            let num = parseInt(fullBase.charAt(i));
            if (i % 2 === 1) num *= 2;  // Double every second digit
            if (num > 9) num -= 9;  // If doubling results in a number >9, subtract 9
            sum += num;
        }

        const lastDigit = (10 - (sum % 10)) % 10;  // Calculate the check digit
        return fullBase + lastDigit;  // Return the complete IMEI (14 digits + 1 check digit)
    }
  else if (opsi === '3bln') {
        const base = '8633570615';

        // Generate the remaining 4 digits randomly
        let randomDigits = '';
        for (let i = 0; i < 4; i++) {
            randomDigits += Math.floor(Math.random() * 10);  // Add a random digit from 0-9
        }

        const fullBase = base + randomDigits;

        // Now calculate the checksum using the Luhn algorithm
        let sum = 0;
        for (let i = 0; i < fullBase.length; i++) {
            let num = parseInt(fullBase.charAt(i));
            if (i % 2 === 1) num *= 2;  // Double every second digit
            if (num > 9) num -= 9;  // If doubling results in a number >9, subtract 9
            sum += num;
        }

        const lastDigit = (10 - (sum % 10)) % 10;  // Calculate the check digit
        return fullBase + lastDigit;  // Return the complete IMEI (14 digits + 1 check digit)
    }
    return null;
}



async function fetchMail(mail) {
    try {
        const pip = await axios.get(`${config.tmail_url}/api/messages/${mail}/${config.tmail_apikey}/`);
        const mess = pip.data[0].content;

        const otpMatch = mess.match(/Kode verifikasi:\s*(\w+)\s*<br>/);
        if (otpMatch) {
            const otpCode = otpMatch[1];
            return otpCode;
        } else {
         return false
        }
    }
    catch (error) {
        return false;
    }
}

module.exports = {
createMail,
fetchMail,
generateImei
}