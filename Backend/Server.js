const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { spawn } = require("child_process");
const path= require("path");

const app = express();


// Enable CORS for the frontend to access the backend
app.use(cors());
// Handle OPTIONS preflight requests


// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});

// Define a route for handling predictions
app.post('/predict', (req, res) => {

    const symptoms = req.body; // Retrieve the data sent from the frontend

    const pythonProcess = spawn("./venv/bin/python3", ["Predict.py"]);
    // Send data to Python script
    pythonProcess.stdin.write(JSON.stringify(symptoms));
    pythonProcess.stdin.end();

    let predictionResult = "";

    // Read output from Python script
    pythonProcess.stdout.on("data", (data) => {
    predictionResult += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });
    
    pythonProcess.on("close", (code) => {
        if (code === 0) {
          res.json(JSON.parse(predictionResult)); // Send prediction back to frontend
        } else {
          res.status(500).json({ error: "Prediction failed" });
        }
    });
});


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


