document.getElementById("predictionForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let features = [];

    for (let i = 1; i <= 30; i++) {
        let value = document.getElementById("f" + i).value;

        if (value === "") {
            alert("Please fill all fields!");
            return;
        }

        features.push(parseFloat(value));
    }

    // Show loading
    let resultEl = document.getElementById("result");
    resultEl.innerText = "Predicting...";
    resultEl.className = "";

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ features: features })
        });

        const data = await response.json();

        if (data.error) {
            resultEl.innerText = "Error: " + data.error;
            resultEl.className = "danger";
        } else {
            resultEl.innerText = data.prediction;

            if (data.prediction.includes("Malignant")) {
                resultEl.className = "danger";
            } else {
                resultEl.className = "success";
            }
        }

    } catch (err) {
        resultEl.innerText = "Server error!";
        resultEl.className = "danger";
    }
});