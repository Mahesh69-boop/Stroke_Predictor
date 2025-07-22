const express = require("express");
const router = express.Router();
const Prediction = require("./Predictions");

router.post("/", async (req, res) => {
  try {
    const { userId, inputData, result } = req.body;

    if (!userId || !inputData || !result) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const newPrediction = new Prediction({
      userId,
      inputData,
      result,
    });

    await newPrediction.save();
    res.status(201).json({ msg: "Prediction saved successfully" });
  } catch (err) {
    console.error("Error saving prediction:", err);
    res.status(500).json({ msg: "Server error saving prediction" });
  }
});

module.exports = router;
