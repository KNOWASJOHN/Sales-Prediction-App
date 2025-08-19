import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Try loading the trained model
try:
    model = joblib.load("sales_prediction.pkl")
except Exception as e:
    print(f"⚠️ Could not load model: {e}")
    model = None

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return jsonify({"message": "Sales Prediction API is running 📊"})

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.get_json(force=True)

        # Extract features
        tv_budget = float(data["TV"])
        radio_budget = float(data["Radio"])
        newspaper_budget = float(data["Newspaper"])

        # Validate inputs
        if tv_budget < 0 or radio_budget < 0 or newspaper_budget < 0:
            return jsonify({"error": "Budget values must be positive"}), 400

        # Build feature array
        features = np.array([[tv_budget, radio_budget, newspaper_budget]])
        prediction = model.predict(features)[0]

        return jsonify({
            "prediction": round(float(prediction), 2),
            "inputs": {
                "TV": tv_budget,
                "Radio": radio_budget,
                "Newspaper": newspaper_budget
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
