import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_absolute_error, accuracy_score
import joblib
import zipfile

# Load the dataset (skip the first row)
data = pd.read_csv('/Users/maheshbhandari/Documents/Hello World/Stroke_Predictor/stroke_risk_dataset.csv', skiprows=1)

# Drop the last two columns to get feature values only
X = data.iloc[:, :-2]

# Targets
y_reg = data.iloc[:, -2]   # 'Stroke Risk (%)'
y_clf = data.iloc[:, -1]   # 'At Risk (Binary)'

# Split the data
X_train, X_test, y_train_reg, y_test_reg, y_train_clf, y_test_clf = train_test_split(
    X, y_reg, y_clf, test_size=0.2, random_state=42
)

# Train regression model
reg_model = RandomForestRegressor(random_state=42)
reg_model.fit(X_train, y_train_reg)

# Train classification model
clf_model = RandomForestClassifier(random_state=42)
clf_model.fit(X_train, y_train_clf)

# Predictions
y_pred_reg = reg_model.predict(X_test)
y_pred_clf = clf_model.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_test_reg, y_pred_reg)
accuracy = accuracy_score(y_test_clf, y_pred_clf)

print(f"Regression MAE: {mae}")
print(f"Classification Accuracy: {accuracy}")

# Save models using joblib
joblib.dump(reg_model, "regression_model.pkl")
joblib.dump(clf_model, "classification_model.pkl")

# Optional: Zip them for backend use
with zipfile.ZipFile("regression_model.pkl.zip", "w") as zipf:
    zipf.write("regression_model.pkl")

with zipfile.ZipFile("classification_model.pkl.zip", "w") as zipf:
    zipf.write("classification_model.pkl")
