const express=require('express');
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken')
const JWT_KEY=require('../../secret')

const app=express();
app.use(express.json());


let users=[
]

//miniapp
const authRouter=express.Router();

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
// .post(postSignUp)

authRouter
.route('/login')
// .post(loginUser)

function middleware1(req,res,next){
    console.log('moddleware encountered');
    next();
}
function middleware2(req,res){
    console.log('moddleware2 encountered');
    res.sendFile('/signupPage.html',{root : __dirname});
    console.log("ended req/res cycle");
}

function getSignUp(req,res,next){
    console.log('signup called');
    next();
}







module.exports=authRouter