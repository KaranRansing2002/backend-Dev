const express=require('express');
const planRouter=express.Router();
const {protectRoute,isAuthorised}=require('../controller/authController')
const {getPlan,getAllPlans,createPlan,updatePlan,deletePlan,top3Plans}=require('../controller/planController')

//bring all plans
planRouter.route('/allPlans')
.get(getAllPlans)

//own plan -> logged in neccessary
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)

//only admins and resowner can change plans
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan)

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

planRouter.route('/top3')
.get(top3Plans)

module.exports=planRouter

//top 3 plans