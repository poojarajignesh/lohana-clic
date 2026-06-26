import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";

function Blood() {
  const [donors, setDonors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [bloodGroup, setBloodGroup] =
    useState("");

  useEffect(() => {
    fetchDonors();
  }, []);
  const fetchRequests =
  async () => {
    try {
      const querySnapshot =
        await getDocs(
          collection(
            db,
            "bloodRequests"
          )
        );

      const requestList =
        querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (request) =>
              request.status ===
              "Approved"
          );

      setRequests(
        requestList
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDonors =
    async () => {
      try {
        const querySnapshot =
          await getDocs(
            collection(
              db,
              "members"
            )
          );

        const donorList =
          querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (member) =>
                member.isBloodDonor ===
                true
            );

        setDonors(
          donorList
        );
      } catch (error) {
        console.log(error);
      }
    };

  const filteredDonors =
    donors.filter(
      (donor) =>
        (bloodGroup === "" ||
          donor.bloodGroup ===
            bloodGroup) &&
        (donor.fullName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
          donor.village
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ))
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
            "linear-gradient(135deg,#DC2626,#EF4444)",
          color: "#fff",
          padding: "25px",
          borderRadius: "24px",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          Blood Donors
        </h1>

        <p
          style={{
            marginTop: "8px",
          }}
        >
          Find Blood Donors
        </p>
      </div>

      <input
        type="text"
        placeholder="Search Name or Village"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          border:
            "1px solid #ddd",
          marginBottom: "15px",
        }}
      />

      <select
        value={bloodGroup}
        onChange={(e) =>
          setBloodGroup(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          border:
            "1px solid #ddd",
          marginBottom: "20px",
        }}
      >
        <option value="">
          All Blood Groups
        </option>

        <option value="A+">
          A+
        </option>
        <option value="A-">
          A-
        </option>
        <option value="B+">
          B+
        </option>
        <option value="B-">
          B-
        </option>
        <option value="AB+">
          AB+
        </option>
        <option value="AB-">
          AB-
        </option>
        <option value="O+">
          O+
        </option>
        <option value="O-">
          O-
        </option>
      </select>

      <p
        style={{
          fontWeight: "600",
          marginBottom: "15px",
        }}
      >
        Total Donors :
        {filteredDonors.length}
      </p>

      {filteredDonors.map(
        (donor) => (
          <div
            key={donor.id}
            style={{
              background:
                "#fff",
              borderRadius:
                "20px",
              padding: "20px",
              marginBottom:
                "15px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                gap: "15px",
                alignItems:
                  "center",
              }}
            >
              {donor.photoUrl ? (
                <img
                  src={
                    donor.photoUrl
                  }
                  alt=""
                  style={{
                    width:
                      "70px",
                    height:
                      "70px",
                    borderRadius:
                      "50%",
                    objectFit:
                      "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width:
                      "70px",
                    height:
                      "70px",
                    borderRadius:
                      "50%",
                    background:
                      "#F3F4F6",
                    display:
                      "flex",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    fontWeight:
                      "700",
                    fontSize:
                      "24px",
                  }}
                >
                  {donor.fullName?.charAt(
                    0
                  )}
                </div>
              )}

              <div>
                <h3
                  style={{
                    margin: 0,
                  }}
                >
                  {
                    donor.fullName
                  }
                </h3>

                <p>
                  🩸{" "}
                  {
                    donor.bloodGroup
                  }
                </p>

                <p>
                  📍{" "}
                  {
                    donor.village
                  }
                </p>
              </div>
            </div>

            <div
              style={{
                display:
                  "flex",
                gap: "10px",
                marginTop:
                  "15px",
              }}
            >
              <a
                href={`tel:${donor.mobile}`}
                style={{
                  flex: 1,
                  textAlign:
                    "center",
                  padding:
                    "12px",
                  background:
                    "#DC2626",
                  color:
                    "#fff",
                  textDecoration:
                    "none",
                  borderRadius:
                    "12px",
                }}
              >
                Call
              </a>

              <a
                href={`https://wa.me/91${donor.mobile}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  textAlign:
                    "center",
                  padding:
                    "12px",
                  background:
                    "#22C55E",
                  color:
                    "#fff",
                  textDecoration:
                    "none",
                  borderRadius:
                    "12px",
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Blood;