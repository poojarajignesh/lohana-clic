import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { loginFamily } from "../auth/Auth";
import logo from "../assets/logo.png";

export default function FamilyLogin() {
  const [familyId, setFamilyId] = useState("");
const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!familyId || !mobile) {
  return alert("Enter Family ID & Mobile Number");
}
    try {
      
    } catch (error) {
      console.error(error);
      await auth.signOut();
      alert(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: 20, background: "linear-gradient(160deg,#2D1B7E,#4527A0,#FF6A2B)" }}>
    <div style={{ width: "100%", maxWidth: 420, background: "#fff", borderRadius: 30, padding: 30, boxShadow: "0 30px 80px rgba(0,0,0,.25)" }}>
      <div style={{ textAlign: "center", marginBottom: 25 }}><img src={logo} alt="Lohana Clic" style={{ width: 220, maxWidth: "100%" }} />
      <p
  style={{
    color: "#64748B",
    marginTop: 10,
    textAlign: "center",
  }}
>
  Login with your
  <br />
  Family ID & Mobile Number
</p>
</div>
     <input
  type="text"
  style={inputStyle}
  placeholder="Family ID"
  value={familyId}
  onChange={(e) => setFamilyId(e.target.value)}
/>

<input
  type="text"
  style={inputStyle}
  placeholder="Mobile Number"
  value={mobile}
  onChange={(e) => setMobile(e.target.value)}
/>
      <button onClick={handleLogin} disabled={loading} style={buttonStyle}>{loading ? "Please wait..." : "Login"}</button>
      <div
  style={{
    textAlign: "center",
    marginTop: 25,
  }}
>
  <span
    style={{
      color: "#64748B",
      fontSize: 14,
    }}
  >
    New Family?
  </span>

  <br />

  <button
    type="button"
    onClick={() => navigate("/add-family")}
    style={{
      border: "none",
      background: "none",
      color: "#FF6A2B",
      fontWeight: "700",
      fontSize: 15,
      cursor: "pointer",
      marginTop: 8,
    }}
  >
    Register Here
  </button>
</div>
    </div>
  </div>;
}


const inputStyle = { width: "100%", padding: 16, borderRadius: 16, border: "1px solid #E2E8F0", marginBottom: 16, boxSizing: "border-box", fontSize: 15 };
const buttonStyle = { width: "100%", padding: 16, borderRadius: 16, border: "none", background: "linear-gradient(135deg,#FF6A2B,#FF8A50)", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer" };
