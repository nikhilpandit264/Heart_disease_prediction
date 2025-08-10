document.getElementById('predictionForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    // Get the form data
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
      // Send data to the backend for prediction
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });
  
      const result = await response.json();
  
      // Display the result on the page
      const resultDiv = document.getElementById('result');
      if (result.prediction === 0) {
        resultDiv.textContent = 'The person does not have heart disease.';
        resultDiv.classList.add('success');
        resultDiv.classList.remove('failure');
      } else {
        resultDiv.textContent = 'The person has heart disease.';
        resultDiv.classList.add('failure');
        resultDiv.classList.remove('success');
      }
  
    } catch (error) {
      console.error('Error:', error);
      const resultDiv = document.getElementById('result');
      resultDiv.textContent = 'Error in prediction. Please try again.';
      resultDiv.classList.add('failure');
      resultDiv.classList.remove('success');
    }
  });
  