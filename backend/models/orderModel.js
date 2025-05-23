import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type:String,required:true},
    items: { type: Array, required:true},
    address:{type:Object,required:true},
    status: {type:String,default:"Food Processing"},
    date: {type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
    comment: {type:String,default:""} // [First]
})

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;