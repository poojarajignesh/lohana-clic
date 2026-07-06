import {
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaTint,
  FaHeart,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function MatrimonyCard({ profile }) {
  const navigate = useNavigate();

  const calculateAge = (dob) => {
    if (!dob) return "-";

    try {
      const parts = dob.split("/");

      const birthDate = new Date(
        parts[2],
        parts[1] - 1,
        parts[0]
      );

      const today = new Date();

      let age =
        today.getFullYear() -
        birthDate.getFullYear();

      const monthDiff =
        today.getMonth() -
        birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 &&
          today.getDate() <
            birthDate.getDate())
      ) {
        age--;
      }

      return age;
    } catch {
      return "-";
    }
  };

  return (
    <div
      onClick={() =>
        navigate(
          `/matrimony/${profile.id}`
        )
      }
      style={{
        background: "#fff",
        borderRadius: "30px",
        overflow: "hidden",
        marginBottom: "22px",
        cursor: "pointer",
        border: "1px solid #EEF2FF",
        boxShadow:
          "0 18px 45px rgba(37,99,235,.08)",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg,#2563EB,#60A5FA)",
          padding: "24px",
          color: "#fff",
          textAlign: "center",
        }}
      >

      
      
              {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt={profile.fullName}
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #fff",
              boxShadow:
                "0 10px 25px rgba(0,0,0,.18)",
            }}
          />
        ) : (
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#fff",
              color: "#2563EB",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "34px",
              fontWeight: "800",
              margin: "0 auto",
            }}
          >
            {profile.fullName?.charAt(0)}
          </div>
        )}

        <h2
          style={{
            marginTop: "15px",
            marginBottom: "6px",
            fontSize: "24px",
            fontWeight: "800",
          }}
        >
          {profile.fullName}
        </h2>

        <div
          style={{
            opacity: .95,
            marginBottom: "14px",
          }}
        >
          {calculateAge(profile.dob)} Years
          {" • "}
          {profile.gender || "Member"}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background:
              "rgba(255,255,255,.18)",
            padding: "8px 16px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          <FaCheckCircle />

          VERIFIED PROFILE
        </div>
      </div>

      <div
        style={{
          padding: "22px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <InfoItem
            icon={
              <FaGraduationCap />
            }
            label="Education"
            value={
              profile.education ||
              "-"
            }
          />

          <InfoItem
            icon={
              <FaBriefcase />
            }
            label="Occupation"
            value={
              profile.occupation ||
              "-"
            }
          />

          <InfoItem
            icon={
              <FaMapMarkerAlt />
            }
            label="City"
            value={
              profile.currentPlace ||
              "-"
            }
          />

          <InfoItem
            icon={<FaTint />}
            label="Blood"
            value={
              profile.bloodGroup ||
              "-"
            }
          />
        </div>
                <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <InfoItem
            icon="📏"
            label="Height"
            value={profile.height || "-"}
          />

          <InfoItem
            icon="💍"
            label="Status"
            value={
              profile.maritalStatus || "-"
            }
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();

            navigate(
              `/matrimony/${profile.id}`
            );
          }}
          style={{
            width: "100%",
            border: "none",
            padding: "15px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg,#FF6B00,#FF8C42)",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            boxShadow:
              "0 10px 25px rgba(255,107,0,.25)",
          }}
        >
          View Full Biodata

          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div
      style={{
        background: "#F8FAFC",
        borderRadius: "18px",
        padding: "14px",
        border:
          "1px solid #EEF2FF",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          marginBottom: "8px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "#64748B",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: "700",
          color: "#1E293B",
          fontSize: "14px",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default MatrimonyCard;