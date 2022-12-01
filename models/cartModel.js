const mongoose      =require('mongoose')
const Schema        = mongoose.Schema


const cartSchema= new Schema({
    userEmail:{
        type:String,
        required:true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
            },
            size:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                default:1
            },
            subPriceTotal:{
                type:Number
            }
        }
    ],
    ordered:{
        type:Date,
        default: Date.now()
    }

})

const cart=new mongoose.model('cart', cartSchema)

module.exports=cart