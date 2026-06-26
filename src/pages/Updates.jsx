import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";

function Updates() {
  const [updates, setUpdates] =
    useState([]);

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

        const updatesList =
          querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (update) =>
                update.status ===
                "Approved"
            );

        setUpdates(
          updatesList
        );
      } catch (error) {
        console.log(error);
      }
    };

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
            "linear-gradient(135deg,#2D1B7E,#4F46E5)",
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
          Community Updates
        </h1>

        <p
          style={{
            marginTop: "8px",
          }}
        >
          Latest News & Announcements
        </p>
      </div>

      {updates.length ===
      0 ? (
        <div
          style={{
            textAlign:
              "center",
            marginTop:
              "40px",
            color:
              "#666",
          }}
        >
          No Updates Found
        </div>
      ) : (
        updates.map(
          (update) => (
            <div
              key={
                update.id
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
              <h3
                style={{
                  color:
                    "#2D1B7E",
                  marginTop:
                    0,
                }}
              >
                {
                  update.title
                }
              </h3>

              <p
                style={{
                  lineHeight:
                    "1.6",
                }}
              >
                {
                  update.description
                }
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Updates;