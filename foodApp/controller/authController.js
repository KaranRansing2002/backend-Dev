const express=require('express');
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken')
const {sendMail}=require('../utility/nodemailer')
const JWT_KEY=require('../../secret')

module.exports.signup=async function signup(req,res){
    try{
        let obj=req.body;
        let user=await userModel.create(obj)
        sendMail("signup",user)
        if(user){
            res.json({
                message : 'user signed up',
                data : user
            })
        }
        else{
            res.json({
                message : "error while signing up"
            })
        }
    }catch(err){
        res.json({
            message : err.message
        })
    }
}

// login user
module.exports.login=async function login(req,res){
    try{
        let data=req.body;
        if(!data.email){
            return res.json({
                message : "empty field",
            })
        }
        let user=await userModel.findOne({email : data.email});
        if(user){
            if(user.password==data.password){
                let uid=user['_id']; // unique id
                let token=jwt.sign({payload : uid},JWT_KEY)
                res.cookie('login',token,{httpOnly:true})
                return res.json({
                    message : "User has logged in",
                    userDetails : data
                })
            }
            else{
                return res.json({
                    message : "wrong credentials",
                })
            }
        }
        else{
            return res.json({
                message : "user not found",
            })
        }
    } 
    catch(err){
        return res.json({
            message : err.message
        })
    }
}

//isAuthorised-> to check the users role (admin or user or res owner or delviery boy)

module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)){
            next();
        }else{
            res.status(401).json({
                message : "operation not allowed"
            })
        }
    }
}

// protect route

module.exports.protectRoute=async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.login){
            token=req.cookies.login
            let payload=jwt.verify(token,JWT_KEY)
            if(!payload){
                return res.json({
                    message : "user not verified",
                })
            }
            const user=await userModel.findById(payload.payload);
            req.role=user.role
            req.id=user.id;  
            
            next(); 
            
        }else{
            //browser
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")){
                return res.redirect('/login');
            }
            //poostman
            return res.json({
                message : "please login"
            })  
        }
    }catch(err){
        return res.json({
            message : err.message,
        })
    }
} 

module.exports.forgetPassword=async function forgetPassword(req,res) {
    let{emailv}=req.body;
    try{
        const user=await userModel.findOne({email : emailv})
        if(user){
            const resetToken=user.createResetToken();
            let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`
            //send email to the user useing nodemailer
            let obj={
                resetPasswordLink : resetPasswordLink,
                email : emailv
            }
            sendMail("resetPassword",obj);
            return res.json({
                message : "link sent"
            })
        }else{
            res.json({
                message : "please signup"
            });
        }
        
    }catch(err){ 
        res.json({
            message : err.message
        })
    }
}

module.exports.resetPassword=async function resetPassword(req,res){
    try{
        const token=req.params.token
        let {password,confirmPassword}=req.body;
        const user=await userModel.findOne({resetToken : token})
        // reset password and will save in db
        if(user){
            user.resetPasswordHandler()
            await user.save();
            res.json({
                message : "password changed successfully please login again"
            })
        }
        else{
            res.json({
                message : "user not found here"
            })
        }
    }catch(err){
        res.json({
            message : err.message
        })
    }
}

module.exports.logout=function logout(req,res) {
    res.cookie('login','',{maxAge : 1});
    res.json({
        message : "user logged out succesfully"
    })
}