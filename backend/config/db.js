import mongoose from "mongoose";

export const connectDB =() =>{
  
 mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
        console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    
}

export default connectDB;