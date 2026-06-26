import { FaHome } from "react-icons/fa";
import {
  FaBuilding,
  FaHeart,
  FaTint,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const menus = [
    {
      title: "Home",
      icon: <FaHome size={20} />,
      path: "/",
    },
    {
      title: "Business",
      icon: <FaBuilding size={20} />,
      path: "/business",
    },
    {
      title: "Matrimony",
      icon: <FaHeart size={20} />,
      path: "/matrimony",
    },
    {
      title: "Blood",
      icon: <FaTint size={20} />,
      path: "/blood",
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "15px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "95%",
        maxWidth: "430px",
        background: "#fff",
        borderRadius: "22px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "12px 0",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.15)",
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
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              color: active
                ? "#FF5A1F"
                : "#777",
              fontWeight: active
                ? "700"
                : "500",
            }}
          >
            {item.icon}

            <span
              style={{
                fontSize: "11px",
                marginTop: "4px",
              }}
            >
              {item.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default BottomNav;