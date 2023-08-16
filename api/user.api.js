const user = require('../service/user.service');

const express = require('express');
const router = express.Router();


router.post('/user',async(req,res)=>{
    let firstname = req.body.firstname ; 
    let lastname = req.body.lastname;
    let mobile = req.body.mobile ; 
    let email = req.body.email ; 

    let dbResponse = await user.userByEmailService(email) ; 

    if(dbResponse && dbResponse.rows !=0){
        res.status(409).json({status : "failure", message : "Data already exists"});
    }else{
        console.log(firstname,lastname,mobile,email);
        let message = await user.userService(firstname,lastname,mobile,email);
        res.status(200).json({status : "success", message : message});
    }
})


module.exports = 
    router
