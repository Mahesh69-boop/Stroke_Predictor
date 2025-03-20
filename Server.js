const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const { spawn } = require("child_process");
const https = require("fs");
const fs = require("fs");
const path= require("path");

const app = express();


// Enable CORS for the frontend to access the backend
app.use(cors());
app.use(bodyParser.json());

const MODEL_DIR = path.join(__dirname, "models");
const REGRESSION_MODEL_PATH = path.join(MODEL_DIR, "regression_model.pkl");
const CLASSIFICATION_MODEL_PATH = path.join(MODEL_DIR, "classification_model.pkl");

if (!fs.existsSync(MODEL_DIR)) {
  fs.mkdirSync(MODEL_DIR);
}
// URLs to your `.pkl` files (Modify these)
const MODEL_URLS = {
  regression: "https://drive.google.com/uc?export=download&id=1844lo-QsKhJQpqeyVXyn8jZRU7j39c6L", 
  classification: "https://drive.google.com/uc?export=download&id=1nqFNgmId_hN4jOKe32xbK7zHehtRWW1h"
};

// Function to download a file if it doesn't exist
const downloadFile = (url, outputPath) => {
  return new Promise((resolve, reject) => {
      if (fs.existsSync(outputPath)) {
          console.log(`${outputPath} already exists. Skipping download.`);
          return resolve();
      }

      console.log(`Downloading ${outputPath}...`);
      const file = fs.createWriteStream(outputPath);

      https.get(url, (response) => {
          if (response.statusCode !== 200) {
              return reject(`Failed to download: ${url}`);
          }

          response.pipe(file);
          file.on("finish", () => {
              file.close();
              console.log(`Downloaded: ${outputPath}`);
              resolve();
          });
      }).on("error", (err) => {
          fs.unlink(outputPath, () => {}); // Delete incomplete file
          reject(err.message);
      });
  });
};

// Function to download both `.pkl` files before starting the server
const downloadModels = async () => {
  try {
      await downloadFile(MODEL_URLS.regression, REGRESSION_MODEL_PATH);
      await downloadFile(MODEL_URLS.classification, CLASSIFICATION_MODEL_PATH);
      console.log("All models downloaded successfully.");
  } catch (err) {
      console.error("Error downloading models:", err);
      process.exit(1); // Exit if model download fails
  }
};

app.get('/', (req, res) => {
  res.json({ message: "Server is running" });
});

// Define a route for handling predictions
app.post('/predict', (req, res) => {

    const symptoms = req.body; // Retrieve the data sent from the frontend

    const pythonProcess = spawn("python3", ["predict.py",REGRESSION_MODEL_PATH, CLASSIFICATION_MODEL_PATH]);
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


// Start the server after models are downloaded
downloadModels().then(()=>{
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


