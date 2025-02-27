import express from 'express';
import 'dotenv/config'
import connectDB from './db/index.js';


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERR: ", error);
        throw error;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log('Server started');
    });
}

).catch((err)=>{
    console.log("MONGODB CONNECTION ERROR !!!", err);
    
})