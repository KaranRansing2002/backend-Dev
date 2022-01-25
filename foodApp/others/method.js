const express=require('express');
const app=express();

app.listen(3000);
app.use(express.json());

let users={

}

let allusers=[
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
// show
app.get('/user',(req,res)=>{
    console.log(req.query);
    res.send(users);
})

// get data from frontend
app.post('/user',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        messages : "data recieved succesfully",
        users : req.body,
    })
})

// updata data
app.patch('/user',(req,res)=>{
    console.log('req.body->',req.body);
    let data=req.body;
    for(key in data){
        users[key]=data[key];
    }
    res.json({
        message : "data updated successfully"
    })
})

app.delete('/user',(req,res)=>{
    users={}
    res.json({
        message : "data has been deleted"
    })
})

app.get('/user/:id',(req,res)=>{
    console.log(req.params.id);
    res.send("id is recieved");
})       
