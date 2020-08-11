import express from 'express';
// import data from './data';
import path from 'path';
import config from './config'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoutes'
import productRoute from './routes/productRoutes'
import orderRoute from './routes/orderRoute'
import uploadRoute from './routes/uploadRoute'

dotenv.config();

const mongodbUrl = config.MONGODB_URI;
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const app = express();
app.use(bodyParser.json())
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
})

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => {console.log(`Server started at http://localhost:${config.PORT}`) })
