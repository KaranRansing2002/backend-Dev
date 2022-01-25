const mongoose=require('mongoose');
const db_link='mongodb+srv://admin:T1jSO8g1z8Cc3o7c@cluster0.k7bzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('review database connected');
}).catch((err)=>{
    console.log(err);
})

const reviewSchema=new mongoose.Schema({
    review:{
        type : String,
        required : [true,'review is required']
    },
    rating:{
        type : Number,
        min : 1,
        max:10,
        required : [true,'rating is required']
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    user:{
        type : mongoose.Schema.ObjectId,
        ref : 'userModel',
        required : [true,'review must belong to plan']
    },
    plan:{
        type : mongoose.Schema.ObjectId,
        ref : 'planModel',
        required : [true,'review must belong to plan']
    }
})

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path : "user",
        select : "name profileImage"
    }).populate("plan");
    next();
})

const reviewModel=mongoose.model('reviewModel',reviewSchema);

module.exports=reviewModel;