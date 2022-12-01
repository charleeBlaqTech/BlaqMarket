const express           =require('express')
const bcrypt            =require('bcrypt')
const jwt               =require('jsonwebtoken')
const product           =require('../models/productModel')
const user              =require('../models/userModel')
const order             =require('../models/orderModel')
const cart              =require('../models/cartModel')





const loginGet=(req,res)=>{
    res.render('login',{layout:'other'})
}

const loginPost=async (req,res)=>{
    const {email,password}=req.body
    const userFound= await user.findOne({email:email})
    if(!userFound){
        res.render('login',{ERROR: "the email entered is not found."})
    }else{
        const userPassword=userFound.password
        const confirmedPassword= await bcrypt.compareSync(password, userPassword)
        if(confirmedPassword === true){
            const userId=userFound._id
            const token=await jwt.sign(({userId}), "thisisthebeginningofgreaterthingsinmylife",{expiresIn:360})

            res.cookie("auth", token,{maxAge:360000})
            res.redirect('/home')
        }else{
            res.render('login',{ERROR:"email and password mismatched."})
        }
    }
}

const logoutGet= async(req,res)=>{
    await res.cookie("auth", "",{maxAge:10})
        res.redirect('/login')
}

const registerGet=(req,res)=>{
    res.render('register',{layout:'other'}) 
}

const registerPost=async(req,res)=>{
    const newUser=req.body
    const image=req.files.photo
    let imageName=image.name
    let imagePath=`./public/images/${imageName}`
    image.mv(imagePath)
    await user.create({
        firstname:newUser.firstname,
        lastname:newUser.lastname,
        password:newUser.password,
        username:newUser.username,
        email:newUser.email,
        image:`/images/${imageName}`
    }).then(()=>{
        res.redirect('/home')
    }).catch((error)=>{
        res.status(404).json({message:error.message})
    })
    
}
const homeGet=async(req,res)=>{
        const User=req.user
    
        let limit=Number(8)
        const page=Number(req.query.page)
        const pages=[]
        const totalDocuments= await product.countDocuments()
        const totalPossiblePages=Math.ceil(totalDocuments/limit)
        const products= await product.find().limit(limit).skip((page-1) * limit)
        const newArivals= await product.find().sort({posted:-1}).limit(limit).skip((page-1) * limit)

      try {
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
       
        res.render('index', {products,newArivals,pages,next,previous,User})
      } catch (error) {
        res.send(`error ${error}`)
      }
    
}

const aboutGet=(req,res)=>{
    const User=req.user
    res.render('about',{User})
}

const blogGet=(req,res)=>{
    const User=req.user
    res.render('blog',{User})
}
const cartGet= async (req,res)=>{
    const User=req.user
    let total=0
    const userEmail=User.email
    const goodsToBuy= await cart.findOne({userEmail:userEmail}) .populate({
        path: 'products',
        populate: {
          path: 'product'
        }
      })
      .select('products')
    
    .then((goodsToBuy)=>{   
        const goodsToBuyProducts=goodsToBuy.products
        
        for(let i=0; i<goodsToBuyProducts.length; i++){
            total +=goodsToBuyProducts[i].subPriceTotal
        }

        res.render('cart', {goodsToBuyProducts, total, User})
    })
    .catch((error)=>{
        res.redirect("/product/get")
    })
}
const cartPost=async (req,res)=>{
    const User=req.user
    const userEmail=User.email
    const productID=req.params.id
    const {quantity,size}=req.body
    const theProduct= await product.findOne({_id:productID})
    const productPrice=theProduct.price
    const newProduct={
        product:productID,
        size:size,
        quantity:quantity,
        subPriceTotal:`${productPrice * quantity}`
    }

    const existingCart= await cart.findOne({userEmail:userEmail})
            if(existingCart){
                const updateCart= await cart.findOne({userEmail:userEmail})
                updateCart.products.push(newProduct)
                updateCart.save()
            }else{
                await cart.create({
                    userEmail:userEmail,
                    products:{
                            product:productID,
                            size:size,
                            quantity:quantity,
                            subPriceTotal:`${productPrice * quantity}`
                        }
                    
                })
            }
     res.redirect("/product/get")
}

const cartDelete=async (req,res)=>{
    const productID=req.params.id
    const userEmail=req.user.email
    
    
    const currentCart=await cart.findOne({userEmail:userEmail})
    const currentCartProducts= currentCart.products
    const updatedProducts=currentCartProducts.filter((item)=>{
        return(
            item._id != productID
        )
    })
    currentCart.products=updatedProducts
    currentCart.save()
    .then((response)=>{
            res.redirect("/cart")
    })
    .catch((error)=>{
        res.send(`error ${error}`)
    })
       
}
const contactGet=(req,res)=>{
    const User=req.user
    res.render('contact',{User})
}




module.exports={loginGet,loginPost,registerGet,registerPost,homeGet,aboutGet,contactGet,cartGet,cartPost,cartDelete,blogGet,logoutGet}