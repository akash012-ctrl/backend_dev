import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

// app.use method is used for all the middlware or configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})); 
//getting the data in json format
app.use(express.json({limit:"20kb"}))
// getting the data from url
app.use(express.urlencoded({extended:true,limit:"20kb"}))
// use serves static files and is based on serve-static.
app.use(express.static("public"))
// set and read cookies securly
app.use(cookieParser())





export {app}