    import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AdminUpdates() {
  const [updates, setUpdates] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("Pending");

  useEffect(() => {
    fetchUpdates();
  }, []);

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

        const updateList =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setUpdates(
          updateList
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
            "updates",
            id
          ),
          {
            status,
          }
        );

        fetchUpdates();
      } catch (error) {
        console.log(error);
      }
    };

  const removeUpdate =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this update?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        await deleteDoc(
          doc(
            db,
            "updates",
            id
          )
        );

        fetchUpdates();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredUpdates =
    updates.filter(
      (update) =>
        activeTab ===
        "All"
          ? true
          : update.status ===
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
          color: "#2D1B7E",
          marginBottom: "20px",
        }}
      >
        Community Updates
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
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
        ].map((tab) => (
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
                  ? "#2D1B7E"
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
        ))}
      </div>

      {filteredUpdates.map(
        (update) => (
          <div
            key={update.id}
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
            <h3
              style={{
                color:
                  "#2D1B7E",
              }}
            >
              {update.title}
            </h3>

            <p>
              {
                update.description
              }
            </p>

            <p>
              Status :
              <b>
                {" "}
                {
                  update.status
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
                    update.id,
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
                    update.id,
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
                  removeUpdate(
                    update.id
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

export default AdminUpdates;