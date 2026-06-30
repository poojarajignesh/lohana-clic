import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaStore,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Colors } from "../../theme";

function BusinessCard({
  business,
  ownerMode = false,
}) {
  const navigate = useNavigate();
  const handleDelete = async (
  e
) => {
  e.stopPropagation();

  if (
    !window.confirm(
      "Delete this business?"
    )
  )
    return;

  try {
    await deleteDoc(
      doc(
        db,
        "businesses",
        business.id
      )
    );

    alert(
      "Business Deleted Successfully"
    );

    window.location.reload();
  } catch (error) {
    console.log(error);

    alert(
      "Error deleting business"
    );
  }
};

  return (
    <div
      onClick={() =>
        navigate(`/business/${business.id}`)
      }
      style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "18px",
        marginBottom: "18px",
        cursor: "pointer",
        boxShadow: Colors.shadow,
        border: "1px solid #F3F4F6",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "18px",
              background:
                Colors.gradientPrimary,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontSize: "24px",
            }}
          >
            <FaStore />
          </div>

          <div>
            <h3
              style={{
                margin: 0,
                color: Colors.text,
                fontSize: "18px",
              }}
            >
              {business.businessName}
            </h3>

            <p
              style={{
                margin: "5px 0",
                color: Colors.subText,
                fontSize: "13px",
              }}
            >
              {business.ownerHeadName ||
                business.ownerName}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: Colors.subText,
                fontSize: "13px",
              }}
            >
              <FaMapMarkerAlt />

              {business.city}
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#DCFCE7",
            color: "#15803D",
            padding: "6px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <FaCheckCircle />

          VERIFIED
        </div>
      </div>

      {/* Category */}

      <div
        style={{
          display: "inline-block",
          background: "#EEF2FF",
          color: Colors.primaryDark,
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          marginBottom: "15px",
        }}
      >
        {business.category}
      </div>

      {/* Description */}

      <p
        style={{
          color: Colors.subText,
          fontSize: "13px",
          lineHeight: "1.6",
          marginBottom: "18px",
        }}
      >
        {business.description
          ?.substring(0, 80) || ""}
      </p>

      <div
  style={{
    display: "flex",
    gap: "12px",
  }}
>
  {ownerMode ? (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation();

          navigate(
            `/edit-business/${business.id}`
          );
        }}
        style={{
          flex: 1,
          padding: "12px",
          border: "none",
          borderRadius: "14px",
          background: "#2563EB",
          color: "#fff",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        ✏️ Edit
      </button>

      <button
        onClick={handleDelete}
        style={{
          flex: 1,
          padding: "12px",
          border: "none",
          borderRadius: "14px",
          background: "#DC2626",
          color: "#fff",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        🗑 Delete
      </button>
    </>
  ) : (
    <>
      <a
        href={`tel:${business.mobile}`}
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          flex: 1,
          textAlign: "center",
          background:
            Colors.gradientOrange,
          color: "#fff",
          padding: "12px",
          borderRadius: "14px",
          textDecoration: "none",
          fontWeight: "700",
        }}
      >
        <FaPhoneAlt /> Call
      </a>

      <a
        href={`https://wa.me/91${business.mobile}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) =>
          e.stopPropagation()
        }
        style={{
          flex: 1,
          textAlign: "center",
          background: "#25D366",
          color: "#fff",
          padding: "12px",
          borderRadius: "14px",
          textDecoration: "none",
          fontWeight: "700",
        }}
      >
        <FaWhatsapp /> WhatsApp
      </a>
    </>
  )}
</div>
    </div>
  );
}

export default BusinessCard;