import {
  useState,
  useEffect,
} from "react";


import {
  collection,
  getDocs,
} from "firebase/firestore";
import AnnouncementStrip from "../components/AnnouncementStrip";
import HomeSearch from "../components/home/HomeSearch";
import StatsCards from "../components/home/StatsCards";
import QuickActions from "../components/home/QuickActions";

import HomeHeader from "../components/home/HomeHeader";

import { db } from "../firebase/config";
import AdvertisementSlider from "../components/AdvertisementSlider";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

import LatestCards from "../components/home/LatestCards";
import AddBusinessButton from "../components/home/AddBusinessButton";


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
       padding: "12px 20px 120px",
        paddingBottom: "120px",
      }}
    >
      {/* Location */}

      

      {/* Logo */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "4px",
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
    
      <div
  style={{
    marginBottom: "16px",
  }}
>
  <HomeHeader />
</div>
      
      <AnnouncementStrip />
      <AdvertisementSlider />
      
      {/* Search */}

     <HomeSearch
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  onSearch={(e) => {
    if (
      e.key === "Enter" &&
      search.trim()
    ) {
      navigate(
        `/search?q=${encodeURIComponent(search)}`
      );
    }
  }}
/>

<StatsCards
  familyCount={familyCount}
  memberCount={memberCount}
  businessCount={businessCount}
/>
      {/* Add Business */}

      <AddBusinessButton
  onClick={() =>
    navigate("/add-business")
  }
/>

     <LatestCards
  birthdays={birthdays}
  deathNotes={deathNotes}
  jobs={jobs}
  updates={updates}
/>
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

      
    </div>
  );
}


export default Home;