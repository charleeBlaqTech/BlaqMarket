const mongoose      =require('mongoose')
const Schema        = mongoose.Schema


const orderSchema= new Schema({
    products:[
      
    ]
    ,
    amountPayed:{
        type:Number
    },
    paymentStatus:{
        type:String,
        default:"pending"
    },
    customer:{
        type: String
    },
    ordered:{
        type:Date,
        default: Date.now()
    }

})



const order=new mongoose.model('order', orderSchema)

module.exports=order