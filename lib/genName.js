const fs = require('fs')

const genName = () => {
const dbname = fs.readFileSync('./username.txt', 'utf8')
const name = dbname.split('\n')
const rand = name[Math.floor(Math.random() * name.length)]
return rand
}

module.exports = {
    genName
}