const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const user=require('../models/userModel')



const checkUser= async (req,res,next)=>{
    const Auth=req.cookies.auth
    if(Auth){
        const decoded= await jwt.decode(Auth)
        const hisID=decoded.userId
        const loggedInUser= await user.findById(hisID)
        req.user=loggedInUser
        next()
    }else{
        res.redirect('/login')
    }
}


module.exports=checkUser







