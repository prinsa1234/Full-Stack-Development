import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else if (value === "DEL") {
      handleDelete();
    } else {
      setInput(input + value);
    }
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C", "DEL"
  ];

  return (
    <div className="calculator-container">
      <h1 className="title">Calculator</h1>
      <input
        type="text"
        className="display"
        value={input}
        readOnly
      />
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`btn 
              ${btn === "C" ? "clear" : ""}
              ${btn === "=" ? "equals" : ""}
              ${btn === "DEL" ? "delete" : ""}
            `}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
