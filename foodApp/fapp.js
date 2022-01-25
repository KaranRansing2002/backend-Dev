const express=require('express');
const app=express();
const userModel=require('./models/userModel');
const cookieParser=require('cookie-parser');
const userRouter=require('./Routers/userRouter');
const planRouter=require('./Routers/planRouter');
const reviewRouter=require('./Routers/reviewRouter')
const bookingRouter=require('./Routers/bookingRouter')

app.listen(3000);
app.use(express.json());
app.use(cookieParser());

let users=[
] 

//miniapp
// base user , router to use
app.use("/user",userRouter);
app.use("/plans",planRouter);
app.use('/review',reviewRouter)
app.use('/booking',bookingRouter);
