let SK='sk_test_51K96NiSE0mSwz2G7GzIWA7TSPd43SDVOh0gH2jyUOsABZnXZcq2Q6MgH71knivUyFFDbCAfmqKjGH9STAhUDt9UW00zqntZ9mJ';
const stripe=require('stripe')(SK);
const planModel=require('../models/planModel');
const userModel=require('../models/userModel');

module.exports.createSession=async function createSession(){
    try{
        let userId=req.id;
        let planId=req.params.id;

        const user=await userModel.findById(userId);
        const plan=await planModel.findById(planId);

        const session = await stripe.checkout.session.create({
            payment_method_types : ['card'],
            customer_email : user.email,
            client_refernce_id : plan_id,
            line_items : [
                {
                    name : plan_name,
                    description : plan.description,
                    amount : plan.price*100,
                    quantity : 1
                }
            ],
            //dev =>http
            //production => https

            success_url : `${req.protocol}://${req.get("host")}/profile`,
            cancel_url : `${req.protocol}://${req.get("host")}/profile`,
        })
        res.status(200).json({
            message : "SUCCESS",
            session
        })
    }catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}