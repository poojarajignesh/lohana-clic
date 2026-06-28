import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedFamily } from "../auth/Auth";
import BottomNav from "../components/BottomNav";
import { db } from "../firebase/config";
import BusinessCard from "../components/business/BusinessCard"; 
import BusinessHeader from "../components/business/BusinessHeader";
import CategoryChips from "../components/business/CategoryChips";
import FeaturedBusiness from "../components/business/FeaturedBusiness";

import {
collection,
getDocs,
} from "firebase/firestore";

import {
FaSearch,
FaMapMarkerAlt,
} from "react-icons/fa";

function Business() {
const navigate = useNavigate();

const loggedFamily = getLoggedFamily();

const [businesses, setBusinesses] =
useState([]);

const [search, setSearch] =
useState("");

const [selectedCategory, setSelectedCategory] =
  useState("All");

useEffect(() => {
fetchBusinesses();
}, []);

const fetchBusinesses = async () => {
try {
const querySnapshot =
await getDocs(
collection(db, "businesses")
);


  const businessList =
    querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(
        (business) =>
          business.status ===
          "Approved"
      );

  setBusinesses(businessList);
} catch (error) {
  console.log(error);
}

};

const categories = [
  "All",
  ...new Set(
    businesses.map(
      (b) => b.category
    )
  ),
];

const featuredBusiness =
  businesses.find(
    (b) => b.featured === true
  );

const filteredBusinesses =
  businesses.filter((business) => {
    const matchesSearch =
      business.businessName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      business.category
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      business.subCategory
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =
      selectedCategory ===
        "All" ||
      business.category ===
        selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  });

return (
<div
style={{
maxWidth: "420px",
margin: "0 auto",
padding: "20px",
paddingBottom: "120px",
}}
>
<BusinessHeader
  city={
    loggedFamily?.city ||
    loggedFamily?.village ||
    "Gujarat"
  }
  total={filteredBusinesses.length}
/>

<FeaturedBusiness
  business={featuredBusiness}
/>
<CategoryChips
  categories={categories}
  selected={selectedCategory}
  onSelect={setSelectedCategory}
/>

  {/* Search */}

  <div
    style={{
      position: "relative",
      marginBottom: "20px",
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
      placeholder="Search Business or Category"
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
        outline: "none",
        borderRadius: "16px",
        background: "#fff",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.06)",
        fontSize: "14px",
      }}
    />
  </div>

  {/* Business Cards */}

  {filteredBusinesses.length ===
  0 ? (
    <div
      style={{
        textAlign: "center",
        color: "#777",
        marginTop: "40px",
      }}
    >
      No Businesses Found
    </div>
  ) : (
   filteredBusinesses.map((business) => (
  <BusinessCard
    key={business.id}
    business={business}
  />
))
  )}

  <BottomNav />
</div>


);
}

export default Business;
