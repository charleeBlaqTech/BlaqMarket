const express           =require('express')
const product           =require('../models/productModel')
const user              =require('../models/userModel')
const order             =require('../models/orderModel')
const cart              =require('../models/cartModel')



const productsGet       =async(req,res)=>{
    const User=req.user
    let limit=Number(12)
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
       
        res.render('shop', {products,pages,next,previous,User})
    }).catch((error)=>{
        res.send(`error ${error}`)
    })
    
}

const productGet        =(req,res)=>{
    const User=req.user
    res.render('addProduct',{layout:'others', User})
}

const productPost       =async(req,res)=>{
    const User=req.user
    const {productName,description,price}=req.body
    const file=req.files.file
    let photo=file.name
    let imagePath=`./public/images/${photo}`
    file.mv(imagePath);
     await product.create({
        name:productName,
        price:price,
        description:description,
        image:`/images/${photo}`
    }).then(()=>{
        res.redirect('/product/get')
    }).catch((error)=>{
        res.status(404).json(error.message)
    })
}

const productShowGet    =async(req,res)=>{
    const User=req.user
    const productID=req.params.id
    const oneProduct= await product.findById(productID)
    .then((oneProduct)=>{
        res.render('show', {oneProduct, User})
    }).catch((error)=>{
        res.send(`error ${error}`)
    })
    
}

const productUpdateGet  =(req,res)=>{
    const User=req.user
    res.render('edit',{layout:'others', User})
}

const productUpdatePut  =async(req,res)=>{
    const User=req.user
    const productID=req.params.id
    const {productName,description,price}=req.body
    const foundProduct= await product.findById(productID)
    .then((foundProduct)=>{
        foundProduct.name=productName;
        foundProduct.description=description;
        foundProduct.price=price;

        foundProduct.save()
        res.redirect('/admin/products')

    }).catch((error)=>{
        res.status(404).json(error.message)
    })
    
}

const productDelete     =async(req,res)=>{
    const User=req.user
    const productID=req.params.id
    const foundProduct= await product.findByIdAndDelete(productID)
    .then((foundProduct)=>{
        res.redirect('/admin/products')
    }).catch((error)=>{
        res.status(404).json(error.message)
    })
    
    
}

module.exports={productsGet,productGet,productPost,productShowGet,productUpdateGet,productUpdatePut,productDelete}