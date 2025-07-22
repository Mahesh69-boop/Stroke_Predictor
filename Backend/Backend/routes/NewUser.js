const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./userSchema");
const router = express.Router();

router.post("/signup", async (req,res)=>{
    const {email, password} = req.body;

    try{
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({msg:"User already exists"});

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({email, password:hashed});
         await newUser.save();

         res.status(201).json({msg: "user registred"});
    }catch(err){
        res.status(500).json({msg: "Server error"});
    }
});

module.exports = router;