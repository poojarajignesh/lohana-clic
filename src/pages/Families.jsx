import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../components/BottomNav";
import { db } from "../firebase/config";

import {
collection,
getDocs,
} from "firebase/firestore";

import {
FaSearch,
FaUsers,
FaMapMarkerAlt,
FaPhoneAlt,
} from "react-icons/fa";

function Families() {
const navigate = useNavigate();

const [familyId, setFamilyId] =
useState("");

const [family, setFamily] =
useState(null);

const handleSearch = async () => {
try {
const querySnapshot =
await getDocs(
collection(db, "families")
);

  const familyData =
    querySnapshot.docs.find(
      (doc) =>
        doc.data()
          .familyId
          ?.toUpperCase() ===
          familyId.toUpperCase() &&
        doc.data().status ===
          "Approved"
    );

  if (familyData) {
    setFamily({
      id: familyData.id,
      ...familyData.data(),
    });
  } else {
    alert(
      "Family ID Not Found"
    );

    setFamily(null);
  }
} catch (error) {
  console.log(error);
}

};

return (
<div
style={{
maxWidth: "420px",
margin: "0 auto",
padding: "20px",
paddingBottom: "120px",
}}
>
<h1
style={{
color: "#2D1B7E",
marginBottom: "8px",
}}
>
Family Directory
</h1>


  <p
    style={{
      color: "#666",
      marginBottom: "20px",
    }}
  >
    Enter Family ID
  </p>

  <div
    style={{
      position: "relative",
      marginBottom: "15px",
    }}
  >
    <FaSearch
      style={{
        position: "absolute",
        top: "16px",
        left: "15px",
        color: "#999",
      }}
    />

    <input
      type="text"
      placeholder="LCF000001"
      value={familyId}
      onChange={(e) =>
        setFamilyId(
          e.target.value
        )
      }
      style={{
        width: "100%",
        padding:
          "14px 14px 14px 45px",
        borderRadius: "16px",
        border: "none",
        outline: "none",
        background: "#fff",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.06)",
      }}
    />
  </div>

  <button
    onClick={handleSearch}
    style={{
      width: "100%",
      padding: "14px",
      border: "none",
      borderRadius: "16px",
      background:
        "linear-gradient(135deg,#FF5A1F,#FF7A45)",
      color: "#fff",
      fontWeight: "700",
      cursor: "pointer",
      marginBottom: "20px",
    }}
  >
    Search Family
  </button>

  {family && (
    <div
      onClick={() =>
        navigate(
          `/family/${family.id}`
        )
      }
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "20px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)",
        cursor: "pointer",
      }}
    >
      <h3
        style={{
          color: "#2D1B7E",
          marginBottom: "12px",
        }}
      >
        {family.headName}
      </h3>

      <p>
        🆔 {family.familyId}
      </p>

      <p>
        <FaMapMarkerAlt />{" "}
        {family.village}
      </p>

      <p>
        <FaPhoneAlt />{" "}
        {family.mobile1}
      </p>

      <p>
        <FaUsers /> Family
      </p>
    </div>
  )}

  <BottomNav />
</div>

);
}

export default Families;