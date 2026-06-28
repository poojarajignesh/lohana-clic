import { FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import { getLoggedFamily } from "../auth/Auth";
import { Colors } from "../theme";

function WelcomeCard() {
  const family = getLoggedFamily();

  return (
    <div
      style={{
        background: Colors.gradientPrimary,
        borderRadius: "26px",
        padding: "22px",
        color: "#fff",
        marginBottom: "20px",
        boxShadow: Colors.shadow,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              opacity: .9,
              fontSize: "14px",
            }}
          >
            Welcome 👋
          </p>

          <h2
            style={{
              margin: "8px 0",
              fontWeight: "800",
            }}
          >
            {family?.headName || "Guest"}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              opacity: .9,
              fontSize: "14px",
            }}
          >
            <FaMapMarkerAlt />

            {family?.currentPlace ||
              family?.city ||
              "Ahmedabad"}
          </div>
        </div>

        <FaUserCircle
          size={65}
          color="#ffffff"
        />
      </div>
    </div>
  );
}

export default WelcomeCard;