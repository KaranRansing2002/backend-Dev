const express=require('express');
const app=express();
const mongoose=require('mongoose');
const emailvalidator=require('email-validator');

app.use(express.json());

app.listen(3000);

const userRouter=express.Router();
app.use('/user',userRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(patchUser)
.delete(deleteUser);

const db_link='mongodb+srv://admin:T1jSO8g1z8Cc3o7c@cluster0.k7bzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('database connected');
}).catch((err)=>{
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true,
        validate : function(){
            return emailvalidator.validate(this.email);
        }
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    confirmPassword : {
        type  :String,
        required : true,
        minLength : 8,
        validate : function(){
            return this.confirmPassword==this.password;
        }
    }
})
userSchema.pre("save",function(){
    this.confirmPassword=undefined
})

const userModel=mongoose.model('userModel',userSchema);

// (async function createUser(){
//     let user={
//         name : 'deepak',
//         email : 'deepak@gmail.com',
//         password : '123456789',
//         confirmPassword : '123456789'
//     }
//     let data=await userModel.create(user);
//     console.log(data);
// })();



async function getUser(req,res){
    let users=await userModel.find();
    res.json({
        message : 'list of users',
        data : users
    })
}

async function postUser(req,res){
    let user=req.body;
    let data= await userModel.create(user);
    res.json({
        message : 'data recieved successfully from frontend and been added to the data base',
        dat : data
    })
}

async function patchUser(req,res){
    let data=req.body;
    let user=await userModel.findOneAndUpdate({email : 'aryan@gmail.com'},data);
    res.json({
        message : 'data has been updated succesfully'
    })
}

async function deleteUser(req,res){
    let datamodel=req.body;
    let user=await userModel.findOneAndDelete(datamodel);
    res.json({
        message : 'data has been deleted'
    })
}

