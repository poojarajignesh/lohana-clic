import { useEffect, useState } from "react";

import { db } from "../firebase/config";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AdminBloodRequests() {
  const [requests, setRequests] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("Pending");

  useEffect(() => {
    fetchRequests();
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
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setRequests(
          requestList
        );
      } catch (error) {
        console.log(error);
      }
    };

  const updateStatus =
    async (
      id,
      status
    ) => {
      try {
        await updateDoc(
          doc(
            db,
            "bloodRequests",
            id
          ),
          {
            status,
          }
        );

        fetchRequests();
      } catch (error) {
        console.log(error);
      }
    };

  const removeRequest =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this request?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        await deleteDoc(
          doc(
            db,
            "bloodRequests",
            id
          )
        );

        fetchRequests();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredRequests =
    requests.filter(
      (request) =>
        activeTab ===
        "All"
          ? true
          : request.status ===
            activeTab
    );

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "#DC2626",
          marginBottom:
            "20px",
        }}
      >
        Blood Requests
      </h1>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom:
            "20px",
          overflowX:
            "auto",
        }}
      >
        {[
          "All",
          "Pending",
          "Approved",
          "Rejected",
        ].map(
          (tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(
                  tab
                )
              }
              style={{
                padding:
                  "10px 16px",
                border:
                  "none",
                borderRadius:
                  "12px",
                cursor:
                  "pointer",
                background:
                  activeTab ===
                  tab
                    ? "#DC2626"
                    : "#E5E7EB",
                color:
                  activeTab ===
                  tab
                    ? "#fff"
                    : "#000",
              }}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {filteredRequests.map(
        (
          request
        ) => (
          <div
            key={
              request.id
            }
            style={{
              background:
                "#fff",
              borderRadius:
                "20px",
              padding:
                "20px",
              marginBottom:
                "15px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3>
              {
                request.patientName
              }
            </h3>

            <p>
              🩸{" "}
              {
                request.bloodGroup
              }
            </p>

            <p>
              🏥{" "}
              {
                request.hospital
              }
            </p>

            <p>
              📍{" "}
              {
                request.city
              }
            </p>

            <p>
              👤{" "}
              {
                request.contactPerson
              }
            </p>

            <p>
              📞{" "}
              {
                request.mobile
              }
            </p>

            <p>
              🧪 Units :
              {" "}
              {
                request.units
              }
            </p>

            <p>
              Status :
              {" "}
              <b>
                {
                  request.status
                }
              </b>
            </p>

            <div
              style={{
                display:
                  "flex",
                gap: "8px",
                flexWrap:
                  "wrap",
                marginTop:
                  "15px",
              }}
            >
              <button
                onClick={() =>
                  updateStatus(
                    request.id,
                    "Approved"
                  )
                }
                style={{
                  background:
                    "#22C55E",
                  color:
                    "#fff",
                  border:
                    "none",
                  padding:
                    "10px 14px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                }}
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    request.id,
                    "Rejected"
                  )
                }
                style={{
                  background:
                    "#F59E0B",
                  color:
                    "#fff",
                  border:
                    "none",
                  padding:
                    "10px 14px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                }}
              >
                Reject
              </button>

              <button
                onClick={() =>
                  removeRequest(
                    request.id
                  )
                }
                style={{
                  background:
                    "#EF4444",
                  color:
                    "#fff",
                  border:
                    "none",
                  padding:
                    "10px 14px",
                  borderRadius:
                    "10px",
                  cursor:
                    "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default AdminBloodRequests;