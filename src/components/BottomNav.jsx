import {
  FaHome,
  FaHeart,
  FaTint,
} from "react-icons/fa";

import {
  MdBusiness,
} from "react-icons/md";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { Colors } from "../theme";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      title: "Home",
      icon: <FaHome />,
      path: "/",
    },
    {
      title: "Business",
      icon: <MdBusiness />,
      path: "/business",
    },
    {
      title: "Matrimony",
      icon: <FaHeart />,
      path: "/matrimony",
    },
    {
      title: "Blood",
      icon: <FaTint />,
      path: "/blood",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: "430px",

        background: "rgba(255,255,255,.96)",
        backdropFilter: "blur(16px)",

        borderRadius: "30px",

        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",

        padding: "12px",

        boxShadow:
          "0 18px 45px rgba(0,0,0,.15)",

        border:
          "1px solid rgba(255,255,255,.6)",

        zIndex: 999,
      }}
    >
      {menus.map((item) => {
        const active =
          location.pathname === item.path;

        return (
          <div
            key={item.path}
            onClick={() =>
              navigate(item.path)
            }
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                padding: "12px 16px",

                borderRadius: "18px",

                transition: ".25s",

                cursor: "pointer",

                background: active
                  ? Colors.gradientPrimary
                  : "transparent",

                color: active
                  ? "#fff"
                  : "#666",

                minWidth: "76px",
              }}
            >
              <div
                style={{
                  fontSize: active
                    ? "22px"
                    : "20px",
                }}
              >
                {item.icon}
              </div>

              <span
                style={{
                  fontSize: "11px",
                  marginTop: "5px",
                  fontWeight: active
                    ? "700"
                    : "600",
                }}
              >
                {item.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BottomNav;