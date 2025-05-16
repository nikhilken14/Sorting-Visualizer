document.getElementById("sortForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const input = document.getElementById("numbers").value;
    const algorithm = document.getElementById("algorithm").value;
    const barsContainer = document.getElementById("bars");

    const numbers = input.split(",").map(x => parseInt(x.trim()));
    if (numbers.some(isNaN)) {
        alert("Please enter valid numbers.");
        return;
    }

    const res = await fetch("/sort", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ numbers, algorithm })
    });

    const data = await res.json();
    const steps = data.steps;
    const timeTaken = data.time.toFixed(3);

    for (let step of steps) {
        barsContainer.innerHTML = "";
        for (let num of step) {
            const bar = document.createElement("div");
            bar.className = "bar";
            bar.style.height = (num * 2) + "px";
            barsContainer.appendChild(bar);
        }
        await new Promise(r => setTimeout(r, 10));
    }

    // ✅ Show final results
    const resultBox = document.createElement("div");
    resultBox.className = "alert alert-success mt-3";
    resultBox.innerHTML = `
        <strong>Algorithm :</strong> ${algorithm}<br>
        <strong>Sorted Array:</strong> ${data.sorted.join(", ")}<br>
        <strong>Time Taken:</strong> ${timeTaken} seconds
    `;
    document.querySelector(".container").appendChild(resultBox);
});

document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("numbers").value = "";
    document.getElementById("bars").innerHTML = "";
    const alert = document.querySelector(".alert");
    if (alert) alert.remove();
});
