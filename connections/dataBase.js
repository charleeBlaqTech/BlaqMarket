const mongoose          =require('mongoose')
const dotenv            =require('dotenv').config()



const dbConnection=mongoose.connect(MONGO_ATLAS_CONNECT || MONGO_DB_CONNECT) 

module.exports=dbConnection