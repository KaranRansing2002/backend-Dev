const express=require('express');
const bookingRouter=express.Router();
const {protectRoute}=require('../controller/authController')
const {createSession} = require('../controller/bookingController')

bookingRouter.post('/createSession',protectRoute,createSession);
bookingRouter.get('/createSession',function(req,res){
    res.sendFile("C:\Users\dell\Desktop\vscode\backend\foodApp\view\booking.html")
})

module.exports=bookingRouter