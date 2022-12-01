const mongoose          =require('mongoose')
const dotenv            =require('dotenv').config()



const dbConnection=mongoose.connect("mongodb+srv://charleeblaq:charleeblaq1994@cluster0.nh33n48.mongodb.net/blaqMarket_db") 

module.exports=dbConnection