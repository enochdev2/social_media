import mongoose from "mongoose";


export const db = async() => {
   try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    
    console.log("DB Connected Successfully");
   } catch (error) {
    console.log('db Error' + error);
   }
}

