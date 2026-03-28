from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load model once (on startup)
model = joblib.load("Model/model.pkl")

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if "features" not in data:
            return jsonify({"error": "No features provided"})

        features = data["features"]

        # Validate length
        if len(features) != 30:
            return jsonify({"error": "Expected 30 features"})

        # Convert to numpy array
        features = np.array(features).reshape(1, -1)

        # Predict
        prediction = model.predict(features)[0]

        # Output mapping
        if prediction == 1:
            result = "Malignant (Cancer)"
        else:
            result = "Benign (No Cancer)"

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)})


# Important for Docker
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)