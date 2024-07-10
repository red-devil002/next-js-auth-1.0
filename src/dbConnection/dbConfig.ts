import mongoose from "mongoose";

export async function connectDB() {
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB Connected');    
        })

        connection.on('error', (err) => {
            console.log('MongoDB Connection error' + err);
            process.exit()    
        })
    } catch(error) {
        console.log("Database connection error");
        console.log(error);
    }
}