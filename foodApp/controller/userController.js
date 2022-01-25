const { message } = require('statuses');
const userModel=require('../models/userModel');

module.exports.getUser=async function getUser(req,res){
    let id=req.id
    let user=await userModel.findById(id);
    if(user){
        res.json(user)
    }
    else{ 
        res.json({
            message:'user not found'
        })
    }
}
// module.exports.postUsers=function postUser(req,res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         messages : "data recieved succesfully",
//         users : req.body,
//     })
// }

module.exports.updateUser=async function updateUser(req,res){

    try{
        
        let id=req.params.id    
        let user=await userModel.findById(id);
        let data=req.body;
        if(user){
            const keys=[]; 
            for(let key in data){
                keys.push(key);
            } 
            for(let i=0;i<keys.length;i++){
                user[keys[i]]=data[keys[i]];
            }  
            await user.save();
            res.json({
                message : "data updated successfully",  
                data : data
            })
        }
        else{
            res.json({
                message : 'user not found',
                data : user
            })
        }
    }catch(err){
        res.json({
            message : err.message
        })
    }
}

module.exports.deleteUser=async function deleteUser(req,res){
    try{
        let id=req.params.id;
        let user=await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message : "user not found"
            })
        }
        res.json({
            message : "data has been deleted",
            data  : user
        })
    }catch(err){
        res.json({
            message : err.message,
        })
    }
    
}
module.exports.getAllUser=async function getUserById(req,res){
    try{
        let users=await userModel.find();
        if(users){
            res.json({
                message : 'req recieved',
                data : users,
            })
        }
        else{
            res.json({
                message : "no users found"
            })
        }
    }catch(err){
        console.log(err);
        res.json({
            message : err.message
        })
    }
} 
module.exports.updateProfileImage=async function updateProfileImage(req,res){
    res.json({
        message : "file uploaded sussessdully"
    })
}

// function setCookies(req,res){
//     res.cookie('isLoggedIn',true,{maxAge : 1000*60*60*24,secure:true,httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('cookies has been set ');
// }
// function getCookies(req,res){
//     let cookies=req.cookies;
//     console.log(cookies);
//     res.send('cookies recieved');
// }
