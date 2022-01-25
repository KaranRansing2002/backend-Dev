const express=require('express');
const app=express();

app.listen(3000);
app.use(express.json());

let users=[
    {
        'id': 1,
        'name' : 'abhishek'
    },{
        'id' : 2,
        'name' : 'karan'
    },{
        'id' : 3,
        'name' : 'strange'
    }
]

//miniapp
const userRouter=express.Router();
const authRouter=express.Router();
// base user , router to use
app.use("/user",userRouter);
app.use("/auth",authRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter.route("/:id").get(getUserById)

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp)

function middleware1(req,res,next){
    console.log('moddleware encountered');
    next();
}
function middleware2(req,res){
    console.log('moddleware2 encountered');
    res.sendFile('/signupPage.html',{root : __dirname});
    console.log("ended req/res cycle");
}

function getUser(req,res){
    res.send(users);
}
function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        messages : "data recieved succesfully",
        users : req.body,
    })
}
function updateUser(req,res){
    console.log('req.body->',req.body);
    let data=req.body;
    for(key in data){
        users[key]=data[key];
    }
    res.json({
        message : "data updated successfully"
    })
}
function deleteUser(req,res){
    users={}
    res.json({
        message : "data has been deleted"
    })
}
function getUserById(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={}
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message : 'req recieved',
        data : obj,
    })
}

function getSignUp(req,res,next){
    console.log('signup called');
    next();
}

function postSignUp(req,res){
    let obj=req.body;
    res.json({
        message : 'user signed up',
        data : obj
    })
}