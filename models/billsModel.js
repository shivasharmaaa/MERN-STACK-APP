const mongoose =require('mongoose')

const billSchema=mongoose.Schema({
    customername:{
        type:String,
        required:true
    },
  customernumber:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
        required:true
    },
    subTotal:{
        type:Number,
        required:true
    },
   tax:{
        type:Number,
        required:true
    },
    paymentmode:{
        type:String,
        required:true
    },
    cartItems:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
    }
},{timestamp:true})

const Bills=mongoose.model('bills',billSchema)
module.exports=Bills