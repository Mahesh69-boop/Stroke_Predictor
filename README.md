# 🧠 Stroke Predictor

A full-stack web application that predicts the likelihood of a person experiencing a stroke based on their medical and demographic information. The app uses a trained machine learning model built with Python and presents the prediction results in a user-friendly interface built with React.

---

## 📌 Overview

This project allows users to input health-related data such as age, hypertension, heart disease, and symptoms. The backend processes this data using a pre-trained machine learning model (Random Forest Regressor), and returns both a percentage risk of stroke and a binary classification indicating whether the person is at risk or not.

---

## 🔗 Live Demo

🌐 **Coming soon** – Deployment is in progress

---

## 🧰 Tech Stack

### Frontend
- React
- Axios
- React Router DOM
- Tailwind CSS (or your styling preference)

### Backend
- Node.js
- Express.js
- Python (for the ML model)
- `child_process` to run Python from Node

### Machine Learning
- Python
- Pandas, NumPy, Scikit-learn
- Trained with Random Forest Regressor

### Database
- MongoDB Atlas (for user data and prediction history)

---

## ✨ Features

- 🔐 User authentication (login/signup) using JWT
- 📊 Dashboard showing stroke risk prediction results
- 🧾 History page to review past predictions
- 📥 Upload form for new prediction sessions
- 🌐 Secure token handling with refresh/access tokens
- 📁 Separation of frontend and backend for modular design

---

## 📂 Folder Structure

Stroke_Predictor/
├── Frontend/ # React application
│ ├── App/
│ ├── src/
│ └── public/
├── Backend/ # Express.js server
│ ├── server.js
│ ├── routes/
│ └── models/
├── predict.py # Executes the trained ML model
├── Model.py # Training and saving the model
└── README.md


---

## 🧪 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/Mahesh69-boop/Stroke_Predictor.git
cd Stroke_Predictor

* Setup Backend
cd Backend
npm install
# Create a .env file and add your MongoDB URI and JWT secrets
node server.js

* Setup Frontend
cd ../Frontend/App
npm install
npm run dev

cd ../../
python3 -m venv venv
source venv/bin/activate     # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python Model.py              # Train the model and save it as a .pkl file

Security Highlights
-JWT-based authentication with short-lived access tokens
-HttpOnly refresh tokens for session persistence
-Secure password hashing with bcrypt
-No sensitive data stored on the frontend

🧠 Model Details
Model Used: Random Forest Regressor
Target Outputs:

-Risk%: Float indicating stroke likelihood
-AtRisk (Binary): 0 or 1 indicating yes/no

Metrics Evaluated:

MAE:2.15
Classification Accuracy: 94%


