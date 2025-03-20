import sys
import json
import pickle
import numpy as np

# Get model paths from command-line arguments
regression_model_path = sys.argv[1]
classification_model_path = sys.argv[2]

# Load models
with open(regression_model_path, "rb") as f:
    regression_model = pickle.load(f)

with open(classification_model_path, "rb") as f:
    classification_model = pickle.load(f)


# Read input from Node.js (received as JSON string)
input_data = json.loads(sys.stdin.read())

# Convert input to numpy array
features = np.array(list(input_data.values())).reshape(1, -1)


# Make predictions
risk_percentage = regression_model.predict(features)[0]  # Stroke risk percentage
at_risk =  classification_model.predict(features)[0] # Binary classification

# Return prediction result
output = {"risk_percentage": float(risk_percentage), "at_risk": int(at_risk)}
print(json.dumps(output))
