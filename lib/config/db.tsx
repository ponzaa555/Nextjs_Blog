import mongoose from "mongoose";

export const  ConnectDb = async() =>{
     await mongoose.connect("mongodb+srv://ponpon13173:macbook912545@cluster0.kem6g.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0");
     console.log("DB Connected")
}