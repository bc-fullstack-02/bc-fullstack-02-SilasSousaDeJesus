require('dotenv/config');

module.exports = {
    SECRET: `${process.env.ACCESS_TOKEN_SECRET}`,
    expiresIn: '7d'
}