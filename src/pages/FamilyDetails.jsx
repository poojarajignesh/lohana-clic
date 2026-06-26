
import {
  FaIdCard,
  FaUsers,
} from "react-icons/fa";

import { useEffect, useState } from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { getLoggedFamily } from "../auth/Auth";

import { db } from "../firebase/config";

import {
  doc,
  getDoc,
} from "firebase/firestore";

function FamilyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const loggedFamily = getLoggedFamily();

  const [family, setFamily] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchFamily();
  }, []);

  const fetchFamily = async () => {
    try {
      const docRef = doc(
        db,
        "families",
        id
      );

      const docSnap =
        await getDoc(docRef);

      if (docSnap.exists()) {
        setFamily({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!family) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Family Not Found
      </div>
    );
  }

  const InfoRow = ({
    label,
    value,
  }) => (
    <div
      style={{
        padding: "12px 0",
        borderBottom:
          "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          color: "#6B7280",
          fontWeight: "600",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
        background:
          "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg,#2D1B7E,#5B3DF5)",
          color: "#fff",
          borderRadius: "24px",
          padding: "24px",
          marginBottom: "20px",
        }}
      >
        <h2>
          {family.headName}
        </h2>

        <p>
          <FaIdCard />{" "}
          {family.familyId}
        </p>

        <div
          style={{
            background:
              "#DCFCE7",
            color: "#15803D",
            display:
              "inline-block",
            padding:
              "6px 14px",
            borderRadius:
              "30px",
            fontWeight: "700",
          }}
        >
          {family.status}
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "15px",
        }}
      >
        <h3>
          Contact Information
        </h3>

        <InfoRow
          label="Mobile"
          value={family.mobile1}
        />

        <InfoRow
          label="Whatsapp"
          value={family.whatsapp}
        />

        <InfoRow
          label="Email"
          value={family.email}
        />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "15px",
        }}
      >
        <h3>
          Family Information
        </h3>

        <InfoRow
          label="Head Name"
          value={family.headName}
        />

        <InfoRow
          label="Father Name"
          value={family.fatherName}
        />

        <InfoRow
          label="Grand Father"
          value={
            family.grandFatherName
          }
        />

        <InfoRow
          label="Mosal Atak"
          value={family.mosalAtak}
        />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h3>
          Location Details
        </h3>

        <InfoRow
          label="District"
          value={family.district}
        />

        <InfoRow
          label="Taluka"
          value={family.taluka}
        />

        <InfoRow
          label="Village"
          value={family.village}
        />

        <InfoRow
          label="Native Place"
          value={family.nativePlace}
        />

        <InfoRow
          label="Current Place"
          value={family.currentPlace}
        />

        <InfoRow
          label="Address"
          value={family.address}
        />
      </div>

    /members/${family.familyId}`

<button
  onClick={() =>
    navigate(`/members/${family.familyId}`)
  }
  style={{
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "16px",
    background: "#2D1B7E",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  }}
>
  👥 View Members
</button>
    </div>
  );
}

export default FamilyDetails;

