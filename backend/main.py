from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load model once when app starts
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return "<h1>Sales prediction API backend is running!</h1>"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Extract features
        tv_budget = float(data['TV'])
        radio_budget = float(data['Radio'])
        newspaper_budget = float(data['Newspaper'])
        
        # Validate inputs
        if tv_budget < 0 or radio_budget < 0 or newspaper_budget < 0:
            return jsonify({'error': 'Budget values must be positive', 'success': False}), 400
        
        # Make prediction
        features = np.array([[tv_budget, radio_budget, newspaper_budget]])
        prediction = model.predict(features)[0]
        
        return jsonify({
            'prediction': round(prediction, 2),
            'success': True,
            'inputs': {
                'tv': tv_budget,
                'radio': radio_budget,
                'newspaper': newspaper_budget
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e), 'success': False}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)