import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAdmin = async () => {
    if (!email || !password) return alert("Enter your email and password");
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const token = await credential.user.getIdTokenResult(true);
      if (token.claims.admin !== true) {
        await auth.signOut();
        alert("This account does not have administrator access.");
        return;
      }
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return <div style={{ maxWidth: "420px", margin: "0 auto", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", background: "#F8FAFC" }}>
    <div style={{ width: "100%", background: "#fff", padding: "25px", borderRadius: "25px", boxShadow: "0 10px 30px rgba(0,0,0,.1)" }}>
      <h2 style={{ textAlign: "center", color: "#2D1B7E" }}>Admin Login</h2>
      <input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
      <button onClick={loginAdmin} disabled={loading} style={buttonStyle}>{loading ? "Signing in..." : "Login"}</button>
    </div>
  </div>;
}

const inputStyle = { width: "100%", padding: "14px", borderRadius: "14px", border: "1px solid #ddd", marginTop: "20px", boxSizing: "border-box" };
const buttonStyle = { width: "100%", marginTop: "20px", padding: "14px", border: "none", borderRadius: "16px", background: "linear-gradient(135deg,#1E88E5,#42A5F5)", color: "#fff", fontWeight: "700" };

export default AdminLogin;
