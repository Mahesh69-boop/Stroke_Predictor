const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { spawn } = require("child_process");
const path= require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const Newuser = require("./routes/NewUser");
const User = require("./routes/User");
const history = require("./routes/FetchHistory");
const saveprediction = require("./routes/SavePrediction");
dotenv.config(); // Load .env variables

const app = express();


// Enable CORS for the frontend to access the backend
const allowedOrigins = [
  "http://localhost:5173",          
  "https://strokepredictor.org",   
  "https://www.strokepredictor.org" 
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin like mobile apps or curl requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true
}
));
// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/NewUser", Newuser);
app.use("/api/User", User);
app.use("/api/history", history);
app.use("/api/save",saveprediction);


//  Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log(" Connected to MongoDB"))
.catch(err => console.error(" MongoDB connection error:", err));


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


