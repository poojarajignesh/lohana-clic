import { getLoggedFamily, logoutFamily } from "../auth/Auth";
import { useNavigate } from "react-router-dom";

function WelcomeCard() {
  const navigate = useNavigate();

  const family = getLoggedFamily();

  if (!family) return null;

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg,#2D1B7E,#FF5A1F)",
        color: "#fff",
        padding: "20px",
        borderRadius: "20px",
        marginBottom: "20px",
      }}
    >
      <h2
        style={{
          margin: 0,
        }}
      >
        👋 Welcome
      </h2>

      <h3
        style={{
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        {family.headName || family.familyName}
      </h3>

      <p
        style={{
          margin: 0,
        }}
      >
        📍 {family.city || family.village || "Gujarat"}
      </p>

      <button
        onClick={() => {
          logoutFamily();
          navigate("/family-login");
        }}
        style={{
          marginTop: "15px",
          padding: "10px 18px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "700",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default WelcomeCard;