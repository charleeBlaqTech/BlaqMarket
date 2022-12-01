const express           =require('express')
const product           =require('../models/productModel')
const user              =require('../models/userModel')
const order             =require('../models/orderModel')
const cart              =require('../models/cartModel')



const adminGet      =async(req,res)=>{
    try {
        const userId=req.user.email
        
        const totalProducts= await product.countDocuments()
        const totalOrders= await order.countDocuments()
        const allUsers= await user.countDocuments()
        const ordersDetails= await order.find({})
        
        res.render("admin", {layout:"others", totalProducts,allUsers,totalOrders,ordersDetails})
    } catch (error) {
        res.send(`error ${error}`)
    }
    
   

}

const productsGet   =async (req,res)=>{
    let limit=Number(8)
    const page=Number(req.query.page)
    const pages=[]
    const totalDocuments= await product.countDocuments()
    const totalPossiblePages=Math.ceil(totalDocuments/limit)
    const products= await product.find().sort({posted:-1}).limit(limit).skip((page-1) * limit)
    .then((products)=>{
        for(let i=1; i<=totalPossiblePages;i++){
            pages.push({
                pageNumber:i
            })
        }
        let next=Number(page) + Number(1)
        let previous=Number(page) - Number(1)
        if(previous < 1){
             previous=null
        }
        if(next > pages.length){
             next=null
        }
       
        res.render('adminProducts', {products,pages,next,previous, layout: 'others'})
    }).catch((error)=>{
        res.send(`error ${error}`)
    })
    
}

const updateGet     =async(req,res)=>{
    const productID=req.params.id
    const theProduct= await product.findById(productID)
    .then((theProduct)=>{
        res.render('edit',{layout:'others', theProduct})
    }).catch((error)=>{
        res.send(`error ${error}`)
    })
   
}

module.exports={adminGet,productsGet,updateGet}