const mongoose          =require('mongoose')
const dotenv            =require('dotenv').config()



const dbConnection=mongoose.connect(process.env.MONGO_DB_CONNECT).then(()=>{
    console.log('Database connected successfully')
}).catch((error)=>{
    console.log(error.message)
})


module.exports=dbConnection