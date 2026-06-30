import {
  FaBell,
  FaUserCircle,
  FaMapMarkerAlt,
  FaUserEdit,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getLoggedFamily,
  logoutFamily,
} from "../../auth/Auth";

import { Colors } from "../../theme";

function HomeHeader() {
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [showMenu, setShowMenu] = useState(false);

  const loggedFamily = getLoggedFamily();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    logoutFamily();
    navigate("/family-login");
  };

  return (
    <div
      style={{
        background: Colors.gradientPrimary,
        borderRadius: 22,
        padding: 22,
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
        {/* Left */}
        <div>
          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: 14,
            }}
          >
            Welcome Back 👋
          </p>

          <h2
            style={{
              margin: "4px 0",
              fontWeight: 800,
              fontSize: 24,
            }}
          >
            {loggedFamily?.headName ||
              "Lohana Member"}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: 0.9,
              fontSize: 13,
            }}
          >
            <FaMapMarkerAlt />

            {loggedFamily?.currentPlace ||
              loggedFamily?.village ||
              loggedFamily?.district ||
              "Gujarat"}
          </div>
        </div>

        {/* Right */}
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          {/* Notification */}
          <div
            style={{
              cursor: "pointer",
            }}
          >
            <FaBell size={21} />
          </div>

          {/* Profile */}
          <div
            ref={menuRef}
            style={{
              position: "relative",
            }}
          >
            <div
              onClick={() =>
                setShowMenu(!showMenu)
              }
              style={{
                width: 44,
                height: 44,
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

            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  top: 52,
                  right: 0,
                  width: 220,
                  background: "#fff",
                  color: "#333",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,.15)",
                  zIndex: 999,
                }}
              >
                <MenuItem
                  icon={
                    <FaUserCircle
                      color={Colors.primary}
                    />
                  }
                  text="My Profile"
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/profile");
                  }}
                />

                <MenuItem
                  icon={
                    <FaUsers
                      color={Colors.primary}
                    />
                  }
                  text="Family Members"
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/family-members");
                  }}
                />

                <MenuItem
                  icon={
                    <FaUserEdit
                      color={Colors.primary}
                    />
                  }
                  text="Edit Profile"
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/edit-profile");
                  }}
                />

                <MenuItem
                  icon={
                    <FaSignOutAlt color="red" />
                  }
                  text="Logout"
                  onClick={handleLogout}
                  isLast
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
  isLast = false,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        borderBottom: isLast
          ? "none"
          : "1px solid #f1f5f9",
        transition: ".2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          "#F8FAFC";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          "#fff";
      }}
    >
      {icon}

      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default HomeHeader;