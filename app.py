from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression

app = Flask(__name__)

# Load the heart disease dataset
heart_data = pd.read_csv('heart.csv')

# Split the features and target
X = heart_data.drop(columns='target', axis=1)
Y = heart_data['target']

# Train the logistic regression model
model = LogisticRegression(max_iter=1000)
model.fit(X, Y)

@app.route('/')
def landing():
    # Show the landing page first
    return render_template('landing.html')

@app.route('/index')
def index():
    # Show the prediction form page
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = [
            float(request.form['age']),
            float(request.form['sex']),
            float(request.form['cp']),
            float(request.form['trestbps']),
            float(request.form['chol']),
            float(request.form['fbs']),
            float(request.form['restecg']),
            float(request.form['thalach']),
            float(request.form['exang']),
            float(request.form['oldpeak']),
            float(request.form['slope']),
            float(request.form['ca']),
            float(request.form['thal']),
        ]
        
        input_data_reshaped = np.asarray(input_data).reshape(1, -1)
        prediction = model.predict(input_data_reshaped)
        
        result = 'The Person has Heart Disease' if prediction[0] == 1 else 'The Person does not have a Heart Disease'
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True)
if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
