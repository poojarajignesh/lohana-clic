import {
  FaBell,
  FaUserCircle,
  FaMapMarkerAlt,
  FaUserEdit,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  db,
} from "../../firebase/config";

import {
  getLoggedFamily,
  logoutFamily,
} from "../../auth/Auth";

import {
  Colors,
} from "../../theme";

function HomeHeader() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const menuRef =
    useRef(null);

  const [showMenu, setShowMenu] =
    useState(false);

  const [
    notificationCount,
    setNotificationCount,
  ] = useState(0);

  const loggedFamily =
    getLoggedFamily();

  const loadNotifications =
    async () => {

      try {

        const snap =
          await getDocs(
            query(
              collection(
                db,
                "notifications"
              ),
              where(
                "read",
                "==",
                false
              )
            )
          );

        setNotificationCount(
          snap.size
        );

      } catch (error) {

        console.log(error);

      }

    };

  const handleClickOutside =
    (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {

        setShowMenu(false);

      }

    };

  useEffect(() => {

    loadNotifications();

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

  }, [location.pathname]);

  const handleLogout =
    () => {

      logoutFamily();

      navigate(
        "/family-login"
      );

    };

  return (

    <div
      style={{
        background:
          Colors.gradientPrimary,
        borderRadius: 22,
        padding: 22,
        color: "#fff",
        boxShadow:
          Colors.shadow,
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
        }}
      >

        <div>

          <p
            style={{
              margin: 0,
              opacity: .9,
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
            {
              loggedFamily?.headName ||
              "Lohana Member"
            }
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              opacity: .9,
            }}
          >

            <FaMapMarkerAlt />

            {
              loggedFamily?.currentPlace ||
              loggedFamily?.village ||
              loggedFamily?.district ||
              "Gujarat"
            }

          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems:
              "center",
          }}
        ></div>

                  {/* Notification */}

          <div
            onClick={(e) => {
              e.stopPropagation();
              navigate("/notifications");
            }}
            style={{
              position: "relative",
              cursor: "pointer",
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background:
                "rgba(255,255,255,.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaBell size={22} />

            {notificationCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "#fff",
                  fontSize: "11px",
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "800",
                }}
              >
                {notificationCount}
              </span>
            )}
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
                setShowMenu(
                  !showMenu
                )
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
                  icon={<FaUserCircle />}
                  text="My Profile"
                  onClick={() =>
                    navigate("/profile")
                  }
                />

                <MenuItem
                  icon={<FaUsers />}
                  text="Family Members"
                  onClick={() =>
                    navigate("/families")
                  }
                />

                <MenuItem
                  icon={<FaUserEdit />}
                  text="Edit Profile"
                  onClick={() =>
                    navigate("/profile")
                  }
                />

                <MenuItem
                  icon={
                    <FaSignOutAlt color="red" />
                  }
                  text="Logout"
                  onClick={handleLogout}
                />
              </div>
            )}
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
        alignItems: "center",
        gap: 12,
        cursor: "pointer",
        borderBottom:
          "1px solid #f1f5f9",
      }}
    >
      {icon}
      <span>{text}</span>
    </div>
  );
}

export default HomeHeader;