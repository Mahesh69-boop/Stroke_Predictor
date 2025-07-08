const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./userSchema");

router.post("/login", async (req,res) =>{
    const{email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({msg: "User not found"});

        const match = await bcrypt. compare (password, user.password);
        if(!match) return res.status(401).json({msg :"Invalid password"});
        
        // Access & Refresh Tokens
        

        const accessToken = jwt.sign(
            {id: user._id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        );

        const refreshToken = jwt.sign(
            {id:user._id},
            process.env.REFRESH_SECRET,
            {expiresIn: "7d"}
        );

        // Setting refresh Token in HTTP only cookie

        res.cookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        });

        res.status(200).json({accessToken});
    }
    catch(err){
        console.error("Login error:", err); // debug
        res.status(500).json({msg:"Server error", err});
    }

});

module.exports = router;