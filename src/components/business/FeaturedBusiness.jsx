import { FaStore, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../theme";

function FeaturedBusiness({ business }) {
  const navigate = useNavigate();

  if (!business) return null;

  return (
    <div
      onClick={() =>
        navigate(`/business/${business.id}`)
      }
      style={{
        background: Colors.gradientOrange,
        color: "#fff",
        borderRadius: "26px",
        padding: "22px",
        marginBottom: "20px",
        cursor: "pointer",
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
          <div
            style={{
              fontSize: "12px",
              opacity: .9,
              marginBottom: "8px",
            }}
          >
            ⭐ FEATURED BUSINESS
          </div>

          <h2
            style={{
              margin: 0,
            }}
          >
            {business.businessName}
          </h2>

          <p
            style={{
              marginTop: "8px",
              opacity: .9,
            }}
          >
            {business.category}
          </p>
        </div>

        <FaStore size={48} />
      </div>

      <button
        style={{
          marginTop: "18px",
          border: "none",
          background: "#fff",
          color: Colors.secondaryDark,
          padding: "10px 18px",
          borderRadius: "18px",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        View Business <FaArrowRight />
      </button>
    </div>
  );
}

export default FeaturedBusiness;