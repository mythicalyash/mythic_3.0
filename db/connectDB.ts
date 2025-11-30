import mongoose from "mongoose";

export default async function connectDB(){
    try {
        if(mongoose.connections[0].readyState){
            console.log("Already connected to the database");
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connections[0];
        
        connection.on("connected", () => {
            console.log("Connected to the database successfully");
        });
        connection.on("error", (error) => {
            console.log("Some error occurred while trying to connect to the database: ", error);
        });
    } catch (error) {
        console.error("Error while connecting to the database: ", error);
    }
}