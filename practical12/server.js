import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;

  if (isNaN(num1) || isNaN(num2)) {
    return res.json({ error: "Please enter valid numbers!" });
  }

  const a = parseFloat(num1);
  const b = parseFloat(num2);
  let result;

  switch (operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b === 0) return res.json({ error: "Cannot divide by zero!" });
      result = a / b;
      break;
    default:
      return res.json({ error: "Invalid operation" });
  }

  res.json({ result });
});

app.listen(3000, () => {
  console.log("✅ Express server running at http://localhost:3000");
});
