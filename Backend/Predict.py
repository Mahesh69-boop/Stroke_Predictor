import os
import sys
import json
import zipfile
import joblib
import numpy as np
import tempfile

# ✅ Define paths
BACKEND_DIR = os.path.dirname(os.path.abspath(__file__))  # Backend folder
TEMP_DIR = tempfile.mkdtemp()  # Creates a temporary directory

# Function to extract a model temporarily
def extract_model(zip_filename, pkl_filename):
    zip_path = os.path.join(BACKEND_DIR, zip_filename)
    extracted_pkl_path = os.path.join(TEMP_DIR, pkl_filename)

    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extract(pkl_filename, TEMP_DIR)

    return extracted_pkl_path  # Returns the extracted model path

# Load models from the temporary folder
regression_pkl = extract_model("regression_model.pkl.zip", "regression_model.pkl")
classification_pkl = extract_model("classification_model.pkl.zip", "classification_model.pkl")

# Load models
regression_model = joblib.load(regression_pkl)
classification_model = joblib.load(classification_pkl)

# Read input from Node.js (received as JSON string)
input_data = json.loads(sys.stdin.read())

# Convert input to numpy array
features = np.array(list(input_data.values())).reshape(1, -1)

# Make predictions
risk_percentage = regression_model.predict(features)[0]  # Stroke risk percentage
at_risk = classification_model.predict(features)[0]  # Binary classification

# Return prediction result
output = {"risk_percentage": float(risk_percentage), "at_risk": int(at_risk)}
print(json.dumps(output))  # ✅ Ensure only JSON output
