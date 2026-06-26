import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { db } from "../firebase/config";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  FaPhoneAlt,
  FaWhatsapp,
  FaGraduationCap,
  FaBriefcase,
  FaRulerVertical,
  FaTint,
  FaUsers,
} from "react-icons/fa";

function MatrimonyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const docRef = doc(
        db,
        "members",
        id
      );

      const docSnap =
        await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAge = (
    dob
  ) => {
    if (!dob) return "-";

    try {
      const parts =
        dob.split("/");

      const birthDate =
        new Date(
          parts[2],
          parts[1] - 1,
          parts[0]
        );

      const today =
        new Date();

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

  if (!profile) {
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

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "100vh",
        background: "#F8FAFC",
      }}
    >
      {/* Header */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#1E88E5,#42A5F5)",
          borderRadius: "28px",
          padding: "25px",
          textAlign: "center",
          color: "#fff",
          marginBottom: "20px",
        }}
      >
        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt=""
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              objectFit: "cover",
              border:
                "4px solid #fff",
              marginBottom: "15px",
            }}
          />
        ) : (
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              background: "#fff",
              color: "#1E88E5",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              margin:
                "0 auto 15px",
              fontSize: "40px",
              fontWeight: "700",
            }}
          >
            {profile.fullName?.charAt(
              0
            )}
          </div>
        )}

        <h2
          style={{
            margin: 0,
          }}
        >
          {profile.fullName}
        </h2>

        <p
          style={{
            marginTop: "8px",
          }}
        >
          {profile.gender ||
            "Not Specified"}{" "}
          •{" "}
          {calculateAge(
            profile.dob
          )}{" "}
          Years
        </p>
      </div>

      {/* Details Card */}

      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "20px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
          marginBottom: "20px",
        }}
      >
        <p>
          <FaGraduationCap />{" "}
          <b>Education:</b>{" "}
          {profile.education ||
            "-"}
        </p>

        <p>
          <FaBriefcase />{" "}
          <b>Occupation:</b>{" "}
          {profile.occupation ||
            "-"}
        </p>

        <p>
          <FaTint />{" "}
          <b>Blood Group:</b>{" "}
          {profile.bloodGroup ||
            "-"}
        </p>

        <p>
          <FaRulerVertical />{" "}
          <b>Height:</b>{" "}
          {profile.height ||
            "-"}
        </p>

        <p>
          <b>Relation:</b>{" "}
          {profile.relation ||
            "-"}
        </p>

        <p>
          <b>Family ID:</b>{" "}
          {profile.familyId ||
            "-"}
        </p>
      </div>

      {/* Buttons */}

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        <a
          href={`tel:${profile.mobile}`}
          style={{
            background:
              "#FF6B00",
            color: "#fff",
            textDecoration:
              "none",
            padding: "14px",
            borderRadius: "14px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          <FaPhoneAlt /> Call
        </a>

        <a
          href={`https://wa.me/91${profile.mobile}`}
          target="_blank"
          rel="noreferrer"
          style={{
            background:
              "#25D366",
            color: "#fff",
            textDecoration:
              "none",
            padding: "14px",
            borderRadius: "14px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          <FaWhatsapp /> WhatsApp
        </a>

        {profile.familyDocId && (
          <button
            onClick={() =>
              navigate(
                `/family/${profile.familyDocId}`
              )
            }
            style={{
              border: "none",
              background:
                "#1E88E5",
              color: "#fff",
              padding: "14px",
              borderRadius: "14px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            <FaUsers /> View Family
          </button>
        )}
      </div>
    </div>
  );
}

export default MatrimonyDetails;