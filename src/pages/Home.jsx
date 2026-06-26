import {
  useState,
  useEffect,
} from "react";


import {
  collection,
  getDocs,
} from "firebase/firestore";
import AnnouncementStrip from "../components/AnnouncementStrip";

import { db } from "../firebase/config";
import AdvertisementSlider from "../components/AdvertisementSlider";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import logo from "../assets/logo.png";
import WelcomeCard from "../components/WelcomeCard";



import {
  FaUsers,
  FaBriefcase,
  FaBullhorn,
  FaUniversity,
  FaGift,
  FaUserTie,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

const filteredBusinesses = [];

const [birthdays, setBirthdays] =
  useState([]);

const [deathNotes, setDeathNotes] =
  useState([]);

const [jobs, setJobs] =
  useState([]);

const [updates, setUpdates] =
  useState([]);

  const [tapCount, setTapCount] =
    useState(0);

  const [showAdminLogin, setShowAdminLogin] =
    useState(false);

  const [adminPassword, setAdminPassword] =
    useState("");

    const [familyCount, setFamilyCount] =
  useState(0);

const [memberCount, setMemberCount] =
  useState(0);

const [businessCount, setBusinessCount] =
  useState(0);

useEffect(() => {
  fetchCounts();

  fetchBirthdays();
  fetchDeathNotes();
  fetchJobs();
  fetchUpdates();
}, []);
const fetchBirthdays =
  async () => {
    try {
      const querySnapshot =
        await getDocs(
          collection(
            db,
            "members"
          )
        );

      const today =
        new Date();

      const todayDate =
        today.getDate();

      const todayMonth =
        today.getMonth() + 1;

      const list =
        querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (member) => {
              if (
                !member.dob
              )
                return false;

              const parts =
                member.dob.split(
                  "/"
                );

              return (
                Number(
                  parts[0]
                ) ===
                  todayDate &&
                Number(
                  parts[1]
                ) ===
                  todayMonth
              );
            }
          );

      setBirthdays(
        list.slice(0, 3)
      );
    } catch (error) {
      console.log(error);
    }
  };

const fetchDeathNotes =
  async () => {
    try {
      const querySnapshot =
        await getDocs(
          collection(
            db,
            "deathNotes"
          )
        );

      const list =
        querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (item) =>
              item.status ===
              "Approved"
          );

      setDeathNotes(
        list.slice(0, 3)
      );
    } catch (error) {
      console.log(error);
    }
  };

const fetchJobs =
  async () => {
    try {
      const querySnapshot =
        await getDocs(
          collection(
            db,
            "jobs"
          )
        );

      const list =
        querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (item) =>
              item.status ===
              "Approved"
          );

      setJobs(
        list.slice(0, 3)
      );
    } catch (error) {
      console.log(error);
    }
  };

const fetchUpdates =
  async () => {
    try {
      const querySnapshot =
        await getDocs(
          collection(
            db,
            "updates"
          )
        );

      const list =
        querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (item) =>
              item.status ===
              "Approved"
          );

      setUpdates(
        list.slice(0, 3)
      );
    } catch (error) {
      console.log(error);
    }
  };

const fetchCounts =
  async () => {
    try {
      const familySnap =
        await getDocs(
          collection(
            db,
            "families"
          )
        );

      const memberSnap =
        await getDocs(
          collection(
            db,
            "members"
          )
        );

      const businessSnap =
        await getDocs(
          collection(
            db,
            "businesses"
          )
        );

      setFamilyCount(
        familySnap.size
      );

      setMemberCount(
        memberSnap.size
      );

      setBusinessCount(
        businessSnap.size
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoTap = () => {
    const count = tapCount + 1;

    setTapCount(count);

    if (count === 3) {
      setTapCount(0);
      setShowAdminLogin(true);
    }
  };

  const handlePasswordChange = (e) => {
  const value = e.target.value;

  setAdminPassword(value);

  if (value === "9854") {
    setShowAdminLogin(false);
    setAdminPassword("");
    navigate("/admin");
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
      {/* Location */}

      

      {/* Logo */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <img
          src={logo}
          alt="Lohana Clic"
          onClick={handleLogoTap}
          style={{
            width: "180px",
            cursor: "pointer",
          }}
        />
      </div>

      <WelcomeCard />
      <AnnouncementStrip />

<AdvertisementSlider />
      {/* Search */}

      <input
  type="text"
  placeholder="Search Family, Business, Member..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  onKeyDown={(e) => {
    if (
      e.key === "Enter" &&
      search.trim()
    ) {
      navigate(
        `/search?q=${encodeURIComponent(
          search
        )}`
      );
    }
  }}
  style={{
    width: "100%",
    padding: "14px",
    borderRadius: "16px",
    border: "none",
    outline: "none",
    background: "#fff",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.06)",
    marginBottom: "15px",
  }}
/>
<div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow:
      "0 8px 20px rgba(0,0,0,0.08)",
  }}
>
  <h3
    style={{
      color: "#2D1B7E",
      marginTop: 0,
    }}
  >
    Community Statistics
  </h3>

  <p>
    👨‍👩‍👧‍👦 Families :
    {familyCount}
  </p>

  <p>
    👤 Members :
    {memberCount}
  </p>

  <p>
    🏢 Businesses :
    {businessCount}
  </p>
</div>
      {/* Add Business */}

      <button
        onClick={() =>
          navigate("/add-business")
        }
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "16px",
          background:
            "linear-gradient(135deg,#FF5A1F,#FF7A45)",
          color: "#fff",
          fontSize: "13px",
          fontWeight: "700",
          cursor: "pointer",
          marginBottom: "25px",
          boxShadow:
            "0 10px 20px rgba(255,90,31,0.25)",
        }}
      >
        + Add Business
      </button>

      {/* Categories */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "12px",
        }}
      >
        <div
         style={dashboardCard}
          onClick={() =>
            navigate("/families")
          }
        >
          <div style={iconCircle}>
            <FaUsers
              color="#fff"
              size={20}
            />
          </div>

          <p style={textStyle}>
            Families
          </p>
        </div>

        <div
          style={cardStyle}
          onClick={() =>
            navigate("/jobs")
          }
        >
          <div style={iconCircle}>
            <FaBriefcase
              color="#fff"
              size={20}
            />
          </div>

          <p style={textStyle}>
            Jobs
          </p>
        </div>

        <div style={cardStyle}>
          <div style={iconCircle}>
            <FaBullhorn
              color="#fff"
              size={20}
            />
          </div>

          <p style={textStyle}>
            Updates
          </p>
        </div>

        <div 
        style={cardStyle}>
          <div style={iconCircle}>
            <FaUniversity
              color="#fff"
              size={20}
            />
          </div>

          <p style={textStyle}>
            Mahajan
          </p>
        </div>

        <div style={cardStyle}>
          <div style={iconCircle}>
            <FaGift
              color="#fff"
              size={20}
            />
          </div>

          <p style={textStyle}>
            Offers
          </p>
        </div>

       <div
  style={cardStyle}
  onClick={() =>
    navigate("/professionals")
  }
>
  <div style={iconCircle}>
    <FaUserTie
      color="#fff"
      size={20}
    />
  </div>

  <p style={textStyle}>
    Professionals
  </p>
</div>
      </div>

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(2,1fr)",
    gap: "12px",
    marginTop: "25px",
  }}
>
  <div
    style={{
      background: "#fff",
      borderRadius: "22px",
      padding: "18px",
      boxShadow:
        "0 8px 20px rgba(0,0,0,0.08)",
    }}
  >
    <div
      style={{
        fontSize: "30px",
      }}
    >
      🎂
    </div>

    <h4
      style={{
        margin:
          "10px 0 5px",
      }}
    >
      Birthdays
    </h4>

    <p
      style={{
        color: "#666",
        margin: 0,
      }}
    >
      {birthdays.length}
      {" "}Today
    </p>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: "22px",
      padding: "18px",
      boxShadow:
        "0 8px 20px rgba(0,0,0,0.08)",
    }}
  >
    <div
      style={{
        fontSize: "30px",
      }}
    >
      🕯️
    </div>

    <h4
      style={{
        margin:
          "10px 0 5px",
      }}
    >
      Shraddhanjali
    </h4>

    <p
      style={{
        color: "#666",
        margin: 0,
      }}
    >
      {deathNotes.length}
      {" "}Recent
    </p>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: "22px",
      padding: "18px",
      boxShadow:
        "0 8px 20px rgba(0,0,0,0.08)",
    }}
  >
    <div
      style={{
        fontSize: "30px",
      }}
    >
      💼
    </div>

    <h4
      style={{
        margin:
          "10px 0 5px",
      }}
    >
      Jobs
    </h4>

    <p
      style={{
        color: "#666",
        margin: 0,
      }}
    >
      {jobs.length}
      {" "}Active
    </p>
  </div>

  <div
    style={{
      background: "#fff",
      borderRadius: "22px",
      padding: "18px",
      boxShadow:
        "0 8px 20px rgba(0,0,0,0.08)",
    }}
  >
    <div
      style={{
        fontSize: "30px",
      }}
    >
      📢
    </div>

    <h4
      style={{
        margin:
          "10px 0 5px",
      }}
    >
      Updates
    </h4>

    <p
      style={{
        color: "#666",
        margin: 0,
      }}
    >
      {updates.length}
      {" "}Latest
    </p>
  </div>
</div>
      {/* Admin Modal */}

      {showAdminLogin && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "20px",
              width: "90%",
              maxWidth: "320px",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            <h3
              style={{
                marginBottom:
                  "15px",
                color:
                  "#2D1B7E",
                textAlign:
                  "center",
              }}
            >
              Admin Access
            </h3>

            <input
  type="password"
  autoFocus
  placeholder="Enter Password"
  value={adminPassword}
  onChange={handlePasswordChange}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ddd",
  }}
/>

           
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: "20px",
  padding: "15px 8px",
  minHeight: "110px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  boxShadow:
    "0 8px 20px rgba(0,0,0,0.08)",
};

const iconCircle = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg,#2D1B7E,#FF5A1F)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "10px",
};

const dashboardCard = {
  background: "#fff",
  borderRadius: "22px",
  padding: "18px",
  textAlign: "center",
  cursor: "pointer",
  boxShadow:
    "0 8px 20px rgba(0,0,0,0.08)",
};

const textStyle = {
  fontSize: "14px",
  fontWeight: "700",
  color: "#2D1B7E",
  letterSpacing: "-0.2px",
};

export default Home;