import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected successfully:${conn.connection.host}`);
        
    } catch (error) {
        console.log("MongoDb connection failed",error);
        process.exit(1)
    }
}
export default connectDb