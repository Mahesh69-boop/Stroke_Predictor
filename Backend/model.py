import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_absolute_error, accuracy_score
import joblib

# Load the dataset
data = pd.read_csv('/Users/maheshbhandari/Documents/Hello World/Stroke_Predictor/stroke_risk_dataset.csv', header=None, skiprows=[0])


# Features and target variables
X = data.iloc[:, :-2]
y_reg = data.iloc[:, -2]
y_clf = data.iloc[:, -1]

# Split the data
X_train, X_test, y_train_reg, y_test_reg = train_test_split(X, y_reg, test_size=0.2, random_state=42)
X_train_clf, X_test_clf, y_train_clf, y_test_clf = train_test_split(X, y_clf, test_size=0.2, random_state=42)

# Train the regression model
reg_model = RandomForestRegressor(random_state=42)
reg_model.fit(X_train, y_train_reg)

# Train the classification model
clf_model = RandomForestClassifier(random_state=42)
clf_model.fit(X_train, y_train_clf)

# Make predictions
y_pred_reg = reg_model.predict(X_test)
y_pred_clf = clf_model.predict(X_test)

# Save the trained models
joblib.dump(reg_model, "regression_model.pkl")
joblib.dump(clf_model, "classification_model.pkl")

# Evaluate the models
mae = mean_absolute_error(y_test_reg, y_pred_reg)
accuracy = accuracy_score(y_test_clf, y_pred_clf)

print(f"Regression MAE: {mae}")
print(f"Classification Accuracy: {accuracy}")

