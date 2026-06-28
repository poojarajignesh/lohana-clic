import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLoggedFamily } from "../auth/Auth";

import {
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/config";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTag,
  FaUser,
  FaGlobe,
  FaEnvelope,
  FaShareAlt,
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

function BusinessDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const loggedFamily =
    getLoggedFamily();

  const [business, setBusiness] =
    useState(null);

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness =
    async () => {
      try {
        const docRef = doc(
          db,
          "businesses",
          id
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {
          setBusiness({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

const handleShare =
  async () => {
    const shareText = `
${business.businessName}

Category : ${business.category}

Mobile : ${business.mobile}

Shared via Lohana Clic
`;

    try {
      if (navigator.share) {
        await navigator.share({
          title:
            business.businessName,
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(
          shareText
        );

        alert(
          "Business details copied."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

 

const handleDelete =
  async () => {
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

      navigate("/business");
    } catch (error) {
      console.log(error);

      alert(
        "Unable to delete business."
      );
    }
  };

 

if (!business) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        fontWeight: "700",
      }}
    >
      Loading...
    </div>
  );
}

return (
<div
style={{
maxWidth: "430px",
margin: "0 auto",
padding: "20px",
paddingBottom: "40px",
background:
"#F8FAFC",
minHeight: "100vh",
}}
>
{/* Header */}


  <div
  style={{
    background:
      "linear-gradient(135deg,#2D1B7E,#5B3DF5)",
    color: "#fff",
    borderRadius: "28px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow:
      "0 15px 35px rgba(45,27,126,.25)",
    position: "relative",
    overflow: "hidden",
  }}
>
   <button
  onClick={() => navigate(-1)}
  style={{
    position: "absolute",
    top: "15px",
    left: "15px",
    border: "none",
    background: "rgba(255,255,255,.18)",
    color: "#fff",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    cursor: "pointer",
  }}
>
  <FaArrowLeft />
</button>
   
    <div
      style={{
        display:
          "inline-block",
        background:
          "rgba(255,255,255,0.20)",
        padding:
          "6px 14px",
        borderRadius:
          "30px",
        marginBottom:
          "15px",
        fontSize: "12px",
        fontWeight: "700",
      }}
    >
     <>
  <FaCheckCircle /> Verified Business
</>
    </div>

    <h1
      style={{
        display: "flex",
alignItems: "center",
gap: "6px",
width: "fit-content",
        margin: 0,
        fontSize: "30px",
        fontWeight:"800",
letterSpacing:".4px",
        marginBottom: "10px",
      }}
    >
      {business.businessName}
    </h1>

    <p
      style={{
        margin: 0,
        opacity: 0.9,
      }}
    >
      {business.category}
    </p>
  </div>

  {/* Owner Card */}

  <div
    style={{
      background: "#fff",
      borderRadius: "22px",
      padding: "20px",
      marginBottom: "15px",
      boxShadow:
        "0 8px 20px rgba(0,0,0,0.08)",
    }}
  >
    <h3
      style={{
        color: "#1E88E5",
        marginTop: 0,
      }}
    >
      Business Information
    </h3>

   <InfoRow
  icon={<FaUser />}
  label="Owner"
  value={
    business.ownerHeadName ||
    business.ownerName ||
    "-"
  }
/>

    <InfoRow
      icon={<FaTag />}
      label="Sub Category"
      value={
        business.subCategory ||
        "-"
      }
    />

    <InfoRow
      icon={
        <FaMapMarkerAlt />
      }
      label="City"
      value={
        business.city || "-"
      }
    />

    <InfoRow
      icon={
        <FaMapMarkerAlt />
      }
      label="Address"
      value={
        business.address ||
        "-"
      }
    />
  </div>

  {/* Description */}

  <div
    style={{
      background: "#fff",
      borderRadius: "22px",
      padding: "20px",
      marginBottom: "15px",
      boxShadow:
        "0 8px 20px rgba(0,0,0,0.08)",
    }}
  >
    <h3
      style={{
        color: "#1E88E5",
        marginTop: 0,
      }}
    >
      About Business
    </h3>

    <p
      style={{
        color: "#555",
        lineHeight: "1.8",
      }}
    >
      {business.description ||
        "No description available"}
    </p>
  </div>

  {/* Action Buttons */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "1fr 1fr",
      gap: "12px",
      marginBottom: "15px",
    }}
  >
    <a
      href={`tel:${business.mobile}`}
      style={buttonStyleOrange}
    >
      <FaPhoneAlt />
      Call
    </a>

    <a
      href={`https://wa.me/${
        business.whatsapp ||
        business.mobile
      }`}
      target="_blank"
      rel="noreferrer"
      style={buttonStyleGreen}
    >
      <FaWhatsapp />
      WhatsApp
    </a>

    <a
      href={`mailto:${
        business.email || ""
      }`}
      style={buttonStyleBlue}
    >
      <FaEnvelope />
      Email
    </a>

    <a
      href={
        business.website
          ? business.website
          : "#"
      }
      target="_blank"
      rel="noreferrer"
      style={buttonStyleBlue}
    >
      <FaGlobe />
      Website
    </a>
  </div>
{loggedFamily?.familyId ===
  business.ownerFamilyId && (
  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "1fr 1fr",
      gap: "12px",
      marginBottom: "15px",
    }}
  >
    <button
      onClick={() =>
        navigate(
          `/edit-business/${business.id}`
        )
      }
      style={{
        padding: "15px",
        border: "none",
        borderRadius: "16px",
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
        padding: "15px",
        border: "none",
        borderRadius: "16px",
        background: "#DC2626",
        color: "#fff",
        fontWeight: "700",
        cursor: "pointer",
      }}
    >
      🗑 Delete
    </button>
  </div>
)}
  <button
    onClick={handleShare}
    style={{
      width: "100%",
      padding: "15px",
      border: "none",
      borderRadius: "18px",
      background:
        "linear-gradient(135deg,#FF6B00,#FF8C42)",
      color: "#fff",
      fontWeight: "700",
      fontSize: "16px",
      cursor: "pointer",
    }}
  >
    <FaShareAlt />
    {" "}Share Business
  </button>
</div>


);
}

function InfoRow({
icon,
label,
value,
}) {
return (
<div
style={{
display: "flex",
gap: "12px",
marginBottom: "15px",
}}
>
<div
style={{
color: "#1E88E5",
marginTop: "3px",
}}
>
{icon} </div>


  <div>
    <div
      style={{
        fontSize: "12px",
        color: "#777",
      }}
    >
      {label}
    </div>

    <div
      style={{
        fontWeight: "600",
      }}
    >
      {value}
    </div>
  </div>
</div>


);
}

const buttonStyleOrange = {
background: "#FF6B00",
color: "#fff",
textDecoration: "none",
padding: "14px",
borderRadius: "16px",
display: "flex",
justifyContent: "center",
alignItems: "center",
gap: "8px",
fontWeight: "700",
};

const buttonStyleGreen = {
background: "#25D366",
color: "#fff",
textDecoration: "none",
padding: "14px",
borderRadius: "16px",
display: "flex",
justifyContent: "center",
alignItems: "center",
gap: "8px",
fontWeight: "700",
};

const buttonStyleBlue = {
background: "#1E88E5",
color: "#fff",
textDecoration: "none",
padding: "14px",
borderRadius: "16px",
display: "flex",
justifyContent: "center",
alignItems: "center",
gap: "8px",
fontWeight: "700",
};

export default BusinessDetails;
