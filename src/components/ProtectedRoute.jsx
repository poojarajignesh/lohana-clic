import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

function ProtectedRoute({ children }) {
  const [state, setState] = useState({ loading: true, hasFamily: false });

  useEffect(() => onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setState({ loading: false, hasFamily: false });
      return;
    }

    const token = await user.getIdTokenResult();
    setState({ loading: false, hasFamily: typeof token.claims.familyId === "string" });
  }), []);

  if (state.loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  return state.hasFamily ? children : <Navigate to="/family-login" replace />;
}

export default ProtectedRoute;
