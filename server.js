// NODE NPM PACKAGES & LOCAL MODULES
const express               =require('express')
const exphbs                =require('express-handlebars')
const dotenv                =require('dotenv').config()
const mongoose              =require('mongoose')
const dbConnect             =require('./connections/dataBase')
const fileUpload            =require('express-fileupload')
const cookieParser          =require("cookie-parser")
const methodOverride        =require('method-override')
const homeRoutesRouter      =require('./routes/homeRoutes')
const productsRoutesRouter  =require('./routes/productRoute')
const adminRoutesRouter     =require('./routes/adminRoutes')
const paymentRoutesRouter   =require('./routes/checkout')




const app=express()

// MIDDLE-WARES & 3rd PARTY MODULES 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(fileUpload())
app.use(cookieParser())
app.use(methodOverride("_method"))

// TEMPLATE-ENGINE=HBS
app.engine("hbs",exphbs.engine({
    extname: ".hbs", defaultLayout: "main", runtimeOptions:{
        allowProtoMethodsByDefault: true, allowProtoPropertiesByDefault:true
    }
}))
app.set("view engine", "hbs")


// APP ROUTES
app.use("/",homeRoutesRouter)
app.use("/product",productsRoutesRouter)
app.use("/admin",adminRoutesRouter)
app.use("/order",paymentRoutesRouter)



app.listen(process.env.PORT, ()=>{
    console.log('connected to PORT 4500')
})
