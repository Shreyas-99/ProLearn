   
import mongoose from "mongoose";


const connectDB=async ()=>{
    try {
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}`);
       console.log(connectionInstance.connection.host);       
    } catch (error) {
        console.log("Error while connecting with db (debug in db.js file)",error);
        
    }
}
export default connectDB