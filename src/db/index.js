import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        const dbConnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`mongodb connected !!! DB HOST: ${dbConnectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB Error : ", error);
        process.exit(1);
    }
}


export default connectDB;