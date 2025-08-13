document.getElementById('predictionForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Collect form input values
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;
    const cp = document.getElementById('cp').value;
    const trestbps = document.getElementById('trestbps').value;
    const chol = document.getElementById('chol').value;
    const fbs = document.getElementById('fbs').value;
    const restecg = document.getElementById('restecg').value;
    const thalach = document.getElementById('thalach').value;
    const exang = document.getElementById('exang').value;
    const oldpeak = document.getElementById('oldpeak').value;
    const slope = document.getElementById('slope').value;
    const ca = document.getElementById('ca').value;
    const thal = document.getElementById('thal').value;

    // Prepare data object to send to backend
    const inputData = {
        age,
        sex,
        cp,
        trestbps,
        chol,
        fbs,
        restecg,
        thalach,
        exang,
        oldpeak,
        slope,
        ca,
        thal
    };

    try {
        // Send POST request to backend /predict endpoint
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });

        // Parse the JSON response
        const result = await response.json();

        // Select the result container
        const resultDiv = document.getElementById('result');

        // Update UI based on prediction result
        if (result.prediction === 0) {
            resultDiv.textContent = '✅ The person does not have heart disease.';
            resultDiv.classList.add('success');
            resultDiv.classList.remove('failure');
        } else {
            resultDiv.textContent = '⚠️ The person has heart disease.';
            resultDiv.classList.add('failure');
            resultDiv.classList.remove('success');
        }

        // Smoothly scroll result into view
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add temporary highlight effect for better visibility
        resultDiv.classList.add('highlight');
        setTimeout(() => {
            resultDiv.classList.remove('highlight');
        }, 2000);

    } catch (error) {
        // Handle errors (like server issues)
        console.error('Error:', error);
        const resultDiv = document.getElementById('result');
        resultDiv.textContent = '❌ Error in prediction. Please try again.';
        resultDiv.classList.add('failure');
        resultDiv.classList.remove('success');

        // Scroll error into view as well
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        resultDiv.classList.add('highlight');
        setTimeout(() => {
            resultDiv.classList.remove('highlight');
        }, 2000);
    }
});
