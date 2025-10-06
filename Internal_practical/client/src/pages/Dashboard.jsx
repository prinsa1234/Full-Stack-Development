import React, { useEffect } from "react";

export default function Dashboard() {
 
  useEffect(() => {
    alert(" You are successfully Login...");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Dashboard</h2>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(135deg, #6a0dad, #8a2be2)",
          color: "white",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) =>
          (e.target.style.background =
            "linear-gradient(135deg, #5b0ca1, #751adf)")
        }
        onMouseOut={(e) =>
          (e.target.style.background =
            "linear-gradient(135deg, #6a0dad, #8a2be2)")
        }
      >
        Logout
      </button>
    </div>
  );
}
