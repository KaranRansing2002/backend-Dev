const express=require('express');
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage}=require('../controller/userController');
const app=express();
const userRouter=express.Router();
const multer=require('multer');
const {signup,login,protectRoute,isAuthorised,resetPassword,forgetPassword,logout}=require('../controller/authController')
app.use("/user",userRouter);



//user's options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter.route('/signup')
.post(signup)

userRouter.route('/login')
.post(login)

//forget password
userRouter.route('/forgetPassword')
.post(forgetPassword)

userRouter.route('/resetPassword/:token')
.post(resetPassword);

// multer for file upload
const multerStorage=multer.diskStorage({
    destination : function(req,res,cb){
        cb(null,'./public/images')
    },
    filename : function(req,res,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
})

const filter= function(req,file,cb){
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    } else{
        cb(new Error("Not an image! Please upload an image"),false)
    }
}

const upload=multer({
    storage : multerStorage,
    fileFilter : filter
})

userRouter.post("/ProfileImage",upload.single('photo'),updateProfileImage);
// get request
userRouter.get('/ProfileImage',(req,res)=>{
    res.sendFile("C:/Users/dell/Desktop/vscode/backend/foodApp/multer.html")
})

userRouter.route('/logout')
.get(logout);

//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

//admin specific function
userRouter.use(isAuthorised(['admin']));
userRouter.route('/')
.get(getAllUser)

module.exports=userRouter;