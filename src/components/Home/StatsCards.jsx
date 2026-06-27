import {
  FaUsers,
  FaBuilding,
  FaUserFriends,
} from "react-icons/fa";

import { Colors } from "../../theme";

function StatsCards({
  familyCount,
  memberCount,
  businessCount,
}) {
  const cardStyle = {
    background: "#fff",
    borderRadius: "22px",
    padding: "18px",
    boxShadow: Colors.shadow,
    display: "flex",
    alignItems: "center",
    gap: "15px",
  };

  const iconStyle = {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "22px",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "1fr",
        gap: "15px",
        marginBottom: "25px",
      }}
    >
      <div style={cardStyle}>
        <div
          style={{
            ...iconStyle,
            background:
              Colors.gradientPrimary,
          }}
        >
          <FaUsers />
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color:
                Colors.primaryDark,
            }}
          >
            {familyCount}
          </h2>

          <p
            style={{
              margin: 0,
              color:
                Colors.subText,
            }}
          >
            Families
          </p>
        </div>
      </div>

      <div style={cardStyle}>
        <div
          style={{
            ...iconStyle,
            background:
              Colors.gradientOrange,
          }}
        >
          <FaUserFriends />
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color:
                Colors.primaryDark,
            }}
          >
            {memberCount}
          </h2>

          <p
            style={{
              margin: 0,
              color:
                Colors.subText,
            }}
          >
            Members
          </p>
        </div>
      </div>

      <div style={cardStyle}>
        <div
          style={{
            ...iconStyle,
            background:
              Colors.gradientSuccess,
          }}
        >
          <FaBuilding />
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color:
                Colors.primaryDark,
            }}
          >
            {businessCount}
          </h2>

          <p
            style={{
              margin: 0,
              color:
                Colors.subText,
            }}
          >
            Businesses
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;