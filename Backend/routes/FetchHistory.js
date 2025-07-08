const express = require("express");
const router = express.Router();
const Prediction = require("./Predictions");
const jwt = require("jsonwebtoken");

router.get("/", async(req,res)=>{
    const authheader = req.headers.authorization;
    if(!authheader) return res.status(401).json({msg:"Unsuthorized"});

    const token = authheader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const predictions = await Prediction.find({userId: decoded.email});
        res.json(predictions);
    } catch (err){
        res.status(403).json({msg:"Invalid token", err});
    }
});

module.exports = router;