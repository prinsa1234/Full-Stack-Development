function calculate(operation) {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;

  fetch("/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ num1, num2, operation })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      showPopup("⚠️ " + data.error);
    } else {
      showPopup("✅ Result: " + data.result);
    }
  });
}

function showPopup(message) {
  document.getElementById("popupMessage").innerText = message;
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
