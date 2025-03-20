import sys
import json
import joblib
import numpy as np

# Load the saved models
reg_model = joblib.load("regression_model.pkl")
clf_model = joblib.load("classification_model.pkl")

# Read input from Node.js (received as JSON string)
input_data = json.loads(sys.stdin.read())

# Convert input to numpy array
X_input = np.array([list(input_data.values())]).astype(float)

# Make predictions
risk_percentage = reg_model.predict(X_input)[0]  # Stroke risk percentage
at_risk = clf_model.predict(X_input)[0]  # Binary classification

# Return prediction result
output = {"risk_percentage": float(risk_percentage), "at_risk": int(at_risk)}
print(json.dumps(output))
