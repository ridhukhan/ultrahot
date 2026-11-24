import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
     area:{
        type:String,
        required:true,
    },
     phone:{
        type:String,
        required:true,
    }
},{timestamps:true})
export default mongoose.model("Order",orderSchema)

