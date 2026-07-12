import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

function AdminProtectedRoute({ children }) {
  const [state, setState] = useState({ loading: true, isAdmin: false });

  useEffect(() => onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setState({ loading: false, isAdmin: false });
      return;
    }

    const token = await user.getIdTokenResult();
    setState({ loading: false, isAdmin: token.claims.admin === true });
  }), []);

  if (state.loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  return state.isAdmin ? children : <Navigate to="/admin-login" replace />;
}

export default AdminProtectedRoute;
