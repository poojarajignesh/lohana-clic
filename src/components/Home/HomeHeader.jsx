import { FaBell, FaUserCircle } from "react-icons/fa";
import { Colors } from "../../theme";

function HomeHeader() {
  return (
    <div
      style={{
        background: Colors.gradientPrimary,
        borderRadius: "0 0 30px 30px",
        padding: "25px 20px 35px",
        color: "#fff",
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
              opacity: 0.9,
              fontSize: "14px",
            }}
          >
            Welcome Back 👋
          </p>

          <h2
            style={{
              margin: "5px 0 0",
              fontWeight: "800",
            }}
          >
            Lohana Clic
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <FaBell
            size={22}
            style={{ cursor: "pointer" }}
          />

          <FaUserCircle size={38} />
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
