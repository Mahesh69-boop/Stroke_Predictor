const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  inputData: Object,
  result: {type:Object, required: true},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prediction", predictionSchema);
