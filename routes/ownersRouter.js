const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owners-model");
const { name } = require('ejs');

if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){
        // res.send("hey its working");
        let owners = await ownerModel.find();
        if(owners.length) {
            return res
                .status(503)
                .send("you dont have permission to create a new owner");
        }

        let {fullname,email,password}=req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password, 
        })
        res.status(201).json({
            msge: 'we created a owner',
            owner: createdOwner
        });

    });
}

router.get('/',(req,res)=>{
    res.send('hey its working');
});

console.log(process.env.NODE_ENV);


module.exports=router;