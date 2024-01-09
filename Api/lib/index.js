import mongoose from "mongoose";


export const db = async() => {
   try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology:true,
    });
   } catch (error) {
    console.log('db Error' + error);
   }
}

