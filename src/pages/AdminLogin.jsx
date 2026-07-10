import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const loginAdmin = () => {
    if (password === "9854") {

      localStorage.setItem(
        "isAdmin",
        "true"
      );

      navigate("/admin");

    } else {
      alert(
        "Wrong Admin Password"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: "#F8FAFC",
      }}
    >

      <div
        style={{
          width: "100%",
          background: "#fff",
          padding: "25px",
          borderRadius: "25px",
          boxShadow:
          "0 10px 30px rgba(0,0,0,.1)",
        }}
      >

        <h2
          style={{
            textAlign: "center",
            color: "#2D1B7E",
          }}
        >
          Admin Login
        </h2>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border:
            "1px solid #ddd",
            marginTop: "20px",
          }}
        />

        <button
          onClick={loginAdmin}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            border: "none",
            borderRadius: "16px",
            background:
            "linear-gradient(135deg,#1E88E5,#42A5F5)",
            color: "#fff",
            fontWeight: "700",
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;