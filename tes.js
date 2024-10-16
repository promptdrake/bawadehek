const { fetchMail } = require('./lib/tmailApi');

async function pip() {
const c = await fetchMail('puujoz@aisbircubes.my.id')
console.log(c)
}
pip()