const express           =require('express')
const dotenv            =require('dotenv').config()
const router            =express.Router()
const checkUser         =require('../middlewares/checkUser')
const paystackNode      =require('paystack-node')
const product           =require('../models/productModel')
const user              =require('../models/userModel')
const order             =require('../models/orderModel')
const cart              =require('../models/cartModel')


const paystackkey=process.env.PAY_STACK_KEY
const environment=process.env.PAY_STACK_ENV
const paystack= new paystackNode(paystackkey, environment)


router.post('/checkout/paystack',checkUser, async (req,res)=>{
    const amountPaid=req.body.totaPrice

    const newTransaction= await paystack.initializeTransaction({
        email:req.user.email,
        amount:Number(`${amountPaid * 100}`)
    })
    .then((response)=>{
        res.redirect(response.body.data.authorization_url)
    })
    
   .catch((error)=>{
    res.send(`error ${error}`)
})

})

//verify transaction
router.get("/payment/made", async(req,res)=>{
    const ref=req.query.reference
    const verified= await paystack.verifyTransaction({
        reference:ref
    })
    
    const orderUserDetails= verified.body.data 
    const cartDetails= await cart.findOne({userEmail: orderUserDetails.customer.email})


    const orderedProducts=cartDetails.products

    const newOrder=await order.create({
        amountPayed:Number(orderUserDetails.amount/100),
        paymentStatus: orderUserDetails.status,
        customer: orderUserDetails.customer.email,
        products: [...orderedProducts]
    }) 
    const cartClear= await cart.findOneAndDelete({userEmail: newOrder.customer}) 
    .then((response)=>{
        
        res.redirect("/home")
    })
   .catch((error)=>{
    res.send(`error ${error}`)
    })
   
       

})


module.exports=router