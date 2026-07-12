import {
  useState,
  useEffect,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { useNavigate } from "react-router-dom";

import AnnouncementStrip from "../components/AnnouncementStrip";
import AdvertisementSlider from "../components/AdvertisementSlider";

import HomeHeader from "../components/home/HomeHeader";
import HomeSearch from "../components/home/HomeSearch";
import StatsCards from "../components/home/StatsCards";
import LatestCards from "../components/home/LatestCards";
import AddBusinessButton from "../components/home/AddBusinessButton";
import BloodAlert from "../components/home/BloodAlert";

import { db } from "../firebase/config";
import { getLoggedFamily } from "../auth/Auth";

import logo from "../assets/logo.png";


function Home() {

  const navigate = useNavigate();

  const loggedFamily =
    getLoggedFamily();

  const userCity =
    loggedFamily?.currentPlace ||
    loggedFamily?.city ||
    loggedFamily?.district ||
    "Gujarat";

  const [search, setSearch] =
    useState("");

  const [birthdays, setBirthdays] =
    useState([]);

  const [deathNotes, setDeathNotes] =
    useState([]);

  const [jobs, setJobs] =
    useState([]);

  const [updates, setUpdates] =
    useState([]);

  const [familyCount, setFamilyCount] =
    useState(0);

  const [memberCount, setMemberCount] =
    useState(0);

  const [businessCount, setBusinessCount] =
    useState(0);

  const [tapCount, setTapCount] =
    useState(0);

  useEffect(() => {

    fetchCounts();
    fetchBirthdays();
    fetchDeathNotes();
    fetchJobs();
    fetchUpdates();

  }, []);


  const fetchCounts = async () => {

    try {

      const familySnap =
        await getDocs(
          collection(db, "families")
        );

      const memberSnap =
        await getDocs(
          collection(db, "members")
        );

      const businessSnap =
        await getDocs(
          collection(db, "businesses")
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


  const fetchBirthdays = async () => {

    try {

      const snap =
        await getDocs(
          collection(db, "members")
        );


      const today =
        new Date();

      const date =
        today.getDate();

      const month =
        today.getMonth() + 1;


      const list =
        snap.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((item) => {

          if (!item.dob)
            return false;


          const parts =
            item.dob.split("/");


          return (
            Number(parts[0]) === date &&
            Number(parts[1]) === month
          );

        });


      setBirthdays(
        list.slice(0,3)
      );

    } catch(error) {
      console.log(error);
    }

  };


  const fetchDeathNotes = async () => {

    try {

      const snap =
        await getDocs(
          collection(db,"deathNotes")
        );


      const list =
        snap.docs
        .map((doc)=>({
          id:doc.id,
          ...doc.data(),
        }))
        .filter(
          item =>
          item.status === "Approved"
        );


      setDeathNotes(
        list.slice(0,3)
      );

    } catch(error){
      console.log(error);
    }

  };


  const fetchJobs = async () => {

    try {

      const snap =
        await getDocs(
          collection(db,"jobs")
        );


      const list =
        snap.docs
        .map((doc)=>({
          id:doc.id,
          ...doc.data(),
        }))
        .filter(
          item =>
          item.status === "Approved"
        );


      setJobs(
        list.slice(0,3)
      );

    } catch(error){
      console.log(error);
    }

  };


  const fetchUpdates = async () => {

    try {

      const snap =
        await getDocs(
          collection(db,"updates")
        );


      const list =
        snap.docs
        .map((doc)=>({
          id:doc.id,
          ...doc.data(),
        }))
        .filter(
          item =>
          item.status === "Approved"
        );


      setUpdates(
        list.slice(0,3)
      );


    } catch(error){
      console.log(error);
    }

  };


  const handleLogoTap = () => {

    const count =
      tapCount + 1;

    setTapCount(count);


    if(count === 3){

      setTapCount(0);

      navigate("/admin-login");

    }

  };
  return (

    <div

      style={{

        maxWidth:"420px",

        margin:"0 auto",

        padding:
        "12px 20px 120px",

      }}

    >


      <div

        style={{

          textAlign:"center",

          marginBottom:"6px",

        }}

      >

        <img

          src={logo}

          alt="Lohana Clic"

          onClick={handleLogoTap}

          style={{

            width:"180px",

            cursor:"pointer",

          }}

        />

      </div>


      <HomeHeader />


      <div

        style={{

          margin:
          "14px 0",

          fontSize:"14px",

          fontWeight:"600",

          color:"#555",

        }}

      >

        📍 Showing updates for {userCity}

      </div>


      <AnnouncementStrip />


      <AdvertisementSlider />


      <BloodAlert />


      <HomeSearch

        value={search}

        onChange={(e)=>

          setSearch(
            e.target.value
          )

        }

        onSearch={(e)=>{

          if(

            e.key === "Enter" &&

            search.trim()

          ){

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


      <AddBusinessButton

        onClick={()=>

          navigate(
            "/add-business"
          )

        }

      />


      <LatestCards

        birthdays={birthdays}

        deathNotes={deathNotes}

        jobs={jobs}

        updates={updates}

      />
    </div>

  );

}


export default Home;
