import {
  FaUsers,
  FaBriefcase,
  FaBullhorn,
  FaUniversity,
  FaGift,
  FaUserTie,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { Colors } from "../../theme";

function QuickActions() {
  const navigate = useNavigate();

  const items = [
    {
      title: "Families",
      icon: <FaUsers />,
      route: "/families",
    },
    {
      title: "Jobs",
      icon: <FaBriefcase />,
      route: "/jobs",
    },
    {
      title: "Updates",
      icon: <FaBullhorn />,
      route: "/updates",
    },
    {
      title: "Mahajan",
      icon: <FaUniversity />,
      route: "#",
    },
    {
      title: "Offers",
      icon: <FaGift />,
      route: "#",
    },
    {
      title: "Professionals",
      icon: <FaUserTie />,
      route: "/professionals",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(3,1fr)",
        gap: "15px",
        marginBottom: "25px",
      }}
    >
      {items.map((item) => (
        <div
          key={item.title}
          onClick={() =>
            item.route !== "#" &&
            navigate(item.route)
          }
          style={{
            background: "#fff",
            borderRadius: "22px",
            padding: "18px 10px",
            textAlign: "center",
            cursor: "pointer",
            boxShadow: Colors.shadow,
            transition: ".25s",
          }}
        >
          <div
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "50%",
              background:
                Colors.gradientPrimary,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              margin: "0 auto 12px",
            }}
          >
            {item.icon}
          </div>

          <div
            style={{
              fontWeight: "700",
              color:
                Colors.primaryDark,
              fontSize: "14px",
            }}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuickActions;