import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedFamily } from "../auth/Auth";
import BottomNav from "../components/BottomNav";
import { db } from "../firebase/config";

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

const filteredBusinesses =
businesses.filter(
(business) =>
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
)
);

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
color: "#1E88E5",
fontSize: "28px",
marginBottom: "8px",
}}
>
Business Directory </h1>

  <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#666",
    marginBottom: "20px",
  }}
>
  <FaMapMarkerAlt color="#FF6B00" />

  {loggedFamily
    ? loggedFamily.city ||
      loggedFamily.village ||
      "Gujarat"
    : "Gujarat"}
</div>

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
    filteredBusinesses.map(
      (business) => (
        <div
          key={business.id}
          onClick={() =>
            navigate(
              `/business/${business.id}`
            )
          }
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "20px",
            marginBottom: "16px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
            border:
              "1px solid #F3F4F6",
            cursor: "pointer",
          }}
        >
          <h3
            style={{
              color:
                "#1E88E5",
              marginBottom:
                "10px",
              fontSize:
                "18px",
              fontWeight:
                "700",
            }}
          >
            {
              business.businessName
            }
          </h3>

          <div
            style={{
              display:
                "inline-block",
              background:
                "#F3F4F6",
              padding:
                "6px 12px",
              borderRadius:
                "20px",
              fontSize:
                "12px",
              marginBottom:
                "10px",
            }}
          >
            {
              business.category
            }
          </div>

          <p
            style={{
              color:
                "#666",
              marginBottom:
                "6px",
            }}
          >
            📍{" "}
            {business.city}
          </p>

          <p
            style={{
              color:
                "#888",
              fontSize:
                "13px",
              marginBottom:
                "12px",
            }}
          >
            {
              business.subCategory
            }
          </p>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <a
              href={`tel:${business.mobile}`}
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                flex: 1,
                textAlign:
                  "center",
                background:
                  "#FF6B00",
                color:
                  "#fff",
                padding:
                  "10px",
                borderRadius:
                  "12px",
                textDecoration:
                  "none",
                fontWeight:
                  "600",
              }}
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/91${business.mobile}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) =>
                e.stopPropagation()
              }
              style={{
                flex: 1,
                textAlign:
                  "center",
                background:
                  "#25D366",
                color:
                  "#fff",
                padding:
                  "10px",
                borderRadius:
                  "12px",
                textDecoration:
                  "none",
                fontWeight:
                  "600",
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      )
    )
  )}

  <BottomNav />
</div>


);
}

export default Business;
