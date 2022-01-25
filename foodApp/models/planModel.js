//connect mongoose
const mongoose=require('mongoose');

const db_link='mongodb+srv://admin:T1jSO8g1z8Cc3o7c@cluster0.k7bzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('plan database connected');
}).catch((err)=>{
    console.log(err);
})



const planSchema=new mongoose.Schema({
    name:{
        type : String,
        required : true,
        unique : true,
        maxLength : [20,'pllan name should not exceed more than 20 characters']
    },
    duration  :{
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required  :[true,'price not entered'],
    },
    ratingsAverage:{
        type : Number,
    },
    discount:{
        type : Number,
        validate : [function () {
            return this.discount<100            
        },'discount should not exceed price']
    }

})

const planModel=mongoose.model('planModel',planSchema);



module.exports=planModel;