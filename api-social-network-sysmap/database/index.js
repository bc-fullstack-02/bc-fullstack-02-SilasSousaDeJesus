const mongoose = require('mongoose');
const URI = require('../config/database')


async function main() {
    await mongoose.connect(`${URI.MONGODB_URI}`); 
}

main()
    .then(() => console.log('Connected to database'))
    .catch((e) => console.log(e));

module.exports = mongoose