import {
  FaBell,
  FaUserCircle,
  FaMapMarkerAlt,
  FaUserEdit,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLoggedFamily,
  logoutFamily,
} from "../../auth/Auth";
import { Colors } from "../../theme";


function HomeHeader() {
  const navigate = useNavigate();

const [showMenu, setShowMenu] =
  useState(false);

const loggedFamily =
  getLoggedFamily();

const handleLogout = () => {
  logoutFamily();

  navigate("/family-login");
};
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
    position: "relative",
  }}
>
  <div
    onClick={() =>
      setShowMenu(!showMenu)
    }
    style={{
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      background:
        "rgba(255,255,255,.18)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    }}
  >
    <FaUserCircle size={30} />
  </div>

 {true && (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "52px",
        background: "#fff",
        color: "#222",
        width: "190px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow:
          "0 15px 35px rgba(0,0,0,.15)",
        zIndex: 999,
      }}
    >
      <MenuItem
        icon={<FaUserEdit />}
        text="Edit Profile"
        onClick={() =>
          navigate("/edit-family")
        }
      />

      <MenuItem
        icon={<FaUsers />}
        text="My Family"
        onClick={() =>
          navigate("/family")
        }
      />

      <MenuItem
        icon={<FaSignOutAlt />}
        text="Logout"
        onClick={handleLogout}
      />
    </div>
  )}
</div>
        </div>
      </div>
    </div>
  );
}
function MenuItem({
  icon,
  text,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "14px 18px",
        display: "flex",
        gap: "10px",
        cursor: "pointer",
        alignItems: "center",
        borderBottom:
          "1px solid #F3F4F6",
      }}
    >
      {icon}

      {text}
    </div>
  );
}
export default HomeHeader;
