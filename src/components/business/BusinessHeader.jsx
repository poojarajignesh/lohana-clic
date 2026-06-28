import { FaMapMarkerAlt } from "react-icons/fa";
import { Colors } from "../../theme";

function BusinessHeader({
  city,
  total,
}) {
  return (
    <div
      style={{
        background:
          Colors.gradientPrimary,
        borderRadius: "28px",
        padding: "24px",
        color: "#fff",
        marginBottom: "20px",
        boxShadow: Colors.shadow,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: "800",
        }}
      >
        Business Directory
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FaMapMarkerAlt />

          {city}
        </div>

        <div
          style={{
            background:
              "rgba(255,255,255,.18)",
            padding: "8px 14px",
            borderRadius: "20px",
            fontWeight: "700",
          }}
        >
          {total} Businesses
        </div>
      </div>
    </div>
  );
}

export default BusinessHeader;