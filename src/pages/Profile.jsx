import { useNavigate } from "react-router-dom";
import { getLoggedFamily, logoutFamily } from "../auth/Auth";

import {
  FaUserCircle,
  FaUserEdit,
  FaUsers,
  FaStore,
  FaHeart,
  FaTint,
  FaSignOutAlt,
  FaChevronRight,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();

  const family = getLoggedFamily();

  const handleLogout = () => {
    if (!window.confirm("Logout from Lohana Clic?")) return;

    logoutFamily();

    navigate("/family-login");
  };

  const MenuCard = ({
    icon,
    title,
    subtitle,
    onClick,
    color,
  }) => (
    <div
      onClick={onClick}
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "16px",
        marginBottom: "12px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        boxShadow:
          "0 8px 20px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "14px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "20px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          flex: 1,
          marginLeft: "14px",
        }}
      >
        <div
          style={{
            fontWeight: "700",
            fontSize: "16px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#666",
            fontSize: "13px",
            marginTop: "3px",
          }}
        >
          {subtitle}
        </div>
      </div>

      <FaChevronRight color="#999" />
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg,#2D1B7E,#5B3DF5)",
          borderRadius: "26px",
          color: "#fff",
          padding: "28px",
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        <FaUserCircle
          size={90}
          style={{
            opacity: .95,
          }}
        />

        <h2
          style={{
            marginTop: "15px",
            marginBottom: "5px",
          }}
        >
          {family?.headName}
        </h2>

        <div>{family?.familyId}</div>
                <div
          style={{
            marginTop: "18px",
            background: "rgba(255,255,255,.12)",
            borderRadius: "18px",
            padding: "15px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <FaPhone />

            <span
              style={{
                marginLeft: "10px",
              }}
            >
              {family?.mobile1 || "-"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <FaMapMarkerAlt />

            <span
              style={{
                marginLeft: "10px",
              }}
            >
              {family?.currentPlace ||
                family?.village ||
                "-"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaIdCard />

            <span
              style={{
                marginLeft: "10px",
              }}
            >
              {family?.familyId}
            </span>
          </div>
        </div>
      </div>

      <MenuCard
        icon={<FaUserEdit />}
        title="Edit Profile"
        subtitle="Update family details"
        color="#2563EB"
        onClick={() =>
          navigate(
            `/edit-family/${family?.id}`
          )
        }
      />

      <MenuCard
        icon={<FaUsers />}
        title="My Family"
        subtitle="Family Information"
        color="#7C3AED"
        onClick={() =>
          navigate(
            `/family/${family?.id}`
          )
        }
      />

      <MenuCard
        icon={<FaStore />}
        title="My Businesses"
        subtitle="Manage Businesses"
        color="#EA580C"
        onClick={() =>
          navigate("/my-business")
        }
      />

      <MenuCard
        icon={<FaHeart />}
        title="Matrimony Profile"
        subtitle="View Matrimony"
        color="#DB2777"
        onClick={() =>
          navigate("/matrimony")
        }
      />

      <MenuCard
        icon={<FaTint />}
        title="Blood Requests"
        subtitle="Blood Donation"
        color="#DC2626"
        onClick={() =>
          navigate("/blood")
        }
      />
            <div style={{ height: "12px" }} />

      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "16px",
          border: "none",
          borderRadius: "18px",
          background: "#DC2626",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow:
            "0 8px 20px rgba(220,38,38,.25)",
        }}
      >
        <FaSignOutAlt
          style={{
            marginRight: "8px",
          }}
        />

        Logout
      </button>
    </div>
  );
}

export default Profile;