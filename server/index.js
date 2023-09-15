import dotenv from 'dotenv'
import express  from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUploader from 'express-fileupload'
import morgan from 'morgan';

import path, { dirname } from 'path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import connectDB from './database/connect.js';
import connectCloud from './database/cloudinaryConnect.js';

import productCard from './routes/getCards.js';
import userRoute from './routes/userRouter.js';
import orderRoute from './routes/orderRoutes.js';
import paymentRoute from './routes/paymentRoute.js';
import { createRaozrpayInstance} from './controllers/paymentController.js'

const app=express();

dotenv.config();


app.use(fileUploader());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/v1/products',productCard);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/order',orderRoute);
app.use('/api/v1/payment',paymentRoute);

// app.get('/',(req,res)=>{
//     res.send('hello world!');
// })
// console.log(__dirname)
app.use(express.static(path.join(__dirname,"../client/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../client/build/index.html"))
})

const port=process.env.PORT || 4000;
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        await connectCloud();
        await app.listen(port,()=>console.log(`Server is listening to port no. ${port}`));
        createRaozrpayInstance();

    }catch(err){
        console.log(err);
    }
}
start();