const reviewModel=require('../models/reviewModel');
const planModel=require('../models/planModel');

module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        const reviews=await reviewModel.find();
        if(reviews){
            return res.json({
                message : "reviews retrived",
                data : reviews
            })
        }else{
            return res.json({
                message : "reviews not found"
            })
        }
    }catch(err){
        res.json({
            message  :err.message
        })
    }
}
 
module.exports.top3reviews=async function top3reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({
            ratings  :-1
        }).limit(3);
        if(reviews){
            return res.json({
                message : "reviews retrived",
                data : reviews
            })
        }else{
            return res.json({
                message : "reviews not found"
            })
        }
    }catch(err){
        res.json({
            message  :err.message
        })
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        let planid=req.params.id
        let reviews=await reviewModel.find();
        reviews.filter((review)=>{
            review.plan.id==planid
        })
        if(reviews){
            return res.json({
                message : "review retrived",
                data : reviews
            })
        }else{
            return res.json({
                message : "reviews not found"
            })
        }
    }catch(err){
        res.json({
            message  :err.message
        })
    }
}
let noOfReviews=1;
module.exports.createReview=async function createReview(req,res){
    try{
        let id=req.params.plan;
        let plan=await planModel.findById(id);
        let review=await reviewModel.create(req.body);
        plan.ratingsAverage=(req.body.rating+plan.ratingsAverage)/noOfReviews;
        noOfReviews++;
        //console.log(plan.ratingsAverage,req.body.rating,noOfReviews)
        await plan.save();
        return res.json({
            message : "review created successfully",
            data : review
        })
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports.updateReview=async function updateReview(req,res){
    try{
        let planid=req.params.id;
        
        //review id from front-end
        let id=req.body.id;

        let dataToBeUpdated=req.body;
        let keys=[];
        for(let key in dataToBeUpdated){
            if(key=='id') continue;
            keys.push(key);
        }
        let review=await reviewModel.findById(id);
        for(let i=0;i<keys.length;i++){
            review[keys[i]]=dataToBeUpdated[keys[i]];
        }
        await review.save();
        res.json({
            message : "review updated succesfully",
            data : review
        })

    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
        let id=req.body.id;
        let deletedReview=await reviewModel.findByIdAndDelete(id);
        return res.json({
            message : 'review deleted successfully',
            data : deletedReview
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}
