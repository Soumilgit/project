import os
import joblib
import numpy as np
from flask import Flask, request, jsonify, render_template, redirect

# Initialize Flask app
app = Flask(__name__, template_folder="templates", static_folder="static")

# Path to the trained model file
MODEL_PATH = os.path.join(os.getcwd(), "customer_churn_model.pkl")

# Load the model with error handling
try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")
except FileNotFoundError:
    model = None
    print(f"ERROR: Model file '{MODEL_PATH}' not found!")
except Exception as e:
    model = None
    print(f"ERROR loading model: {e}")

# Home route to render the main webpage
@app.route("/")
def home():
    try:
        # Attempt to render the index.html template
        print("Home route accessed!")
        return render_template("index.html")  # Ensure this is the main file to be rendered
    except Exception as e:
        print(f"ERROR rendering the template: {e}")
        return "Error loading the homepage", 500

# Prediction route to handle POST requests
@app.route("/predict", methods=["POST"])
def predict():
    # Check if the model is loaded
    if model is None:
        return jsonify({"error": "Model not found. Please check the deployment."}), 500
    
    try:
        
        # Get JSON data from the POST request
        data = request.get_json(force=True)
        
        # Ensure data is in the correct format
        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid data format. Expecting a JSON object."}), 400
        
        # Convert the data into a numpy array for prediction
        prediction_data = np.array(list(data.values())).reshape(1, -1)
        
        # Make a prediction
        prediction = model.predict(prediction_data)
        
        # Return the prediction as a JSON response
        return jsonify({"prediction": int(prediction[0])})
    
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 400  # Return error with HTTP 400 status

if __name__ == "__main__":
    # Run the Flask app in debug mode for development
    app.run(debug=True)
