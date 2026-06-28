import { FaBell, FaUserCircle } from "react-icons/fa";
import { Colors } from "../../theme";
import { getLoggedFamily } from "../../auth/Auth";
import { FaMapMarkerAlt } from "react-icons/fa";

const loggedFamily = getLoggedFamily();
function HomeHeader() {
  return (
   <div
  style={{
    background: Colors.gradientPrimary,
    borderRadius: "22px",
    padding: "22px",
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
    margin: "4px 0",
    fontWeight: "800",
    fontSize: "24px",
  }}
>
  {loggedFamily?.headName ||
    "Lohana Member"}
</h2>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    opacity: .9,
    fontSize: "13px",
  }}
>
  <FaMapMarkerAlt />

  {loggedFamily?.currentPlace ||
  loggedFamily?.village ||
  loggedFamily?.district ||
  "Gujarat"}
</div>
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

          <div
  style={{
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "rgba(255,255,255,.18)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <FaUserCircle size={30} />
</div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeader;
