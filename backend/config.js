require('dotenv').config()

export default {
    MONGODB_URI:process.env.MONGODB_URI,
    PORT:process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    accessKeyId: process.env.accessKeyId ,
    secretAccessKey: process.env.secretAccessKey,
}