import mongoose from "mongoose";

export async function DBconnection(){
    try {
        await mongoose.connect(process.env.DB_ATLAS)
        console.log("connection done");
        
    } catch (error) {
        console.log("connection failed");
        console.log(error);
        
    }
}
