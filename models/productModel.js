const mongoose      =require('mongoose')
const Schema        = mongoose.Schema


const productSchema= new Schema({
    name:{
        type:String
    },
    price:{
        type:Number
    },
    description:{
        type:String,
    },
    size:{
        type:String
    },
    image:{
        type: String
    },
    posted:{
        type:Date,
        default: Date.now()
    }

})

const product=new mongoose.model('product', productSchema)

module.exports=product