const express=require('express')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const user=require('../models/userModel')



const authorization= async (req,res,next)=>{
    const userDetail=req.user

    if(userDetail){
        const hisId=userDetail._id
        const retriveUserData= await user.findById(hisId)
        const hisRole=retriveUserData.role
        if(hisRole === "admin"){
            next()
        }else{
            res.redirect('/home')
        }
        
    }else{
        res.redirect('/login')
    }
}


module.exports=authorization