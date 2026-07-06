import { useEffect, useState } from "react";

import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import MatrimonyCard from "../components/matrimony/MatrimonyCard";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  FaSearch,
  FaHeart,
  FaGraduationCap,
  FaBriefcase,
  FaPhoneAlt,
} from "react-icons/fa";

function Matrimony() {
  const [profiles, setProfiles] =
    useState([]);

    
    
  const navigate = useNavigate();  

  const [search, setSearch] =
  useState("");

  const [genderFilter, setGenderFilter] =
  useState("All");


  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles =
    async () => {
      try {
        const querySnapshot =
          await getDocs(
            collection(
              db,
              "members"
            )
          );

        const profileList =
  querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter(
      (member) =>
        member.isMatrimony === true
    );

        setProfiles(
          profileList
        );
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

  const filteredProfiles =
  profiles.filter((profile) => {

    const searchMatch =
      profile.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      profile.education
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      profile.occupation
        ?.toLowerCase()
        .includes(search.toLowerCase());


    const genderMatch =
      genderFilter === "All" ||
      profile.gender === genderFilter;


    return (
      searchMatch &&
      genderMatch
    );
  });

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
        paddingBottom: "100px",
        background:
          "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#1E88E5,#42A5F5)",
          padding: "25px",
          borderRadius: "24px",
          color: "#fff",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "28px",
          }}
        >
          Matrimony
        </h1>

        <p
          style={{
            marginTop: "8px",
            opacity: 0.9,
          }}
        >
          Find Your Perfect Match
        </p>
      </div>

      {/* Search */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            position:
              "relative",
          }}
        >
          <FaSearch
            style={{
              position:
                "absolute",
              left: "15px",
              top: "15px",
              color: "#999",
            }}
          />

          <input
            type="text"
            placeholder="Search Profile"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding:
                "14px 14px 14px 45px",
              border: "none",
              borderRadius:
                "16px",
              outline:
                "none",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          />
        </div>
      </div>

      {/* Gender Filter */}

<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  {["All","Male","Female"].map(
    (item) => (
      <button
        key={item}
        onClick={() =>
          setGenderFilter(item)
        }
      >
        {item}
      </button>
    )
  )}
</div>


{/* Count */}

<div>
  Total Profiles :
  {filteredProfiles.length}
</div>

      {/* Count */}

      <div
        style={{
          marginBottom: "15px",
          color: "#555",
          fontWeight: "600",
        }}
      >
        Total Profiles :
        {" "}
        {
          filteredProfiles.length
        }
      </div>

      

      {/* Premium Cards */}

{filteredProfiles.map(
  (profile) => (
    <MatrimonyCard
      key={profile.id}
      profile={profile}
    />
  )
)}

      {filteredProfiles.length ===
        0 && (
        <div
          style={{
            textAlign:
              "center",
            marginTop:
              "50px",
            color:
              "#777",
          }}
        >
          No Profiles Found
        </div>
      )}
    </div>
  );
}

export default Matrimony;