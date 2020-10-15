require('dotenv').config()

const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test'){
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

console.log(`the system running on ${process.env.NODE_ENV} mode`)

module.exports = {
    MONGODB_URI,
    PORT
}