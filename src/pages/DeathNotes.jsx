import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";

function DeathNotes() {
  const [notes, setNotes] =
    useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes =
    async () => {
      try {
        const querySnapshot =
          await getDocs(
            collection(
              db,
              "deathNotes"
            )
          );

        const noteList =
          querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (note) =>
                note.status ===
                "Approved"
            );

        setNotes(noteList);
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
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background:
            "linear-gradient(135deg,#111827,#374151)",
          color: "#fff",
          padding: "25px",
          borderRadius: "24px",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>
          🕯️ Shraddhanjali
        </h1>

        <p>
          Recent Death Notes
        </p>
      </div>

      {notes.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#666",
          }}
        >
          No Records Found
        </div>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "15px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems:
                  "center",
              }}
            >
              {note.photoUrl ? (
                <img
                  src={
                    note.photoUrl
                  }
                  alt=""
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius:
                      "50%",
                    objectFit:
                      "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius:
                      "50%",
                    background:
                      "#E5E7EB",
                    display: "flex",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    fontSize:
                      "28px",
                    fontWeight:
                      "700",
                  }}
                >
                  {note.name?.charAt(
                    0
                  )}
                </div>
              )}

              <div>
                <h3>
                  {note.name}
                </h3>

                <p>
                  📍{" "}
                  {
                    note.village
                  }
                </p>

                <p>
                  Age :{" "}
                  {note.age}
                </p>
              </div>
            </div>

            <p
              style={{
                marginTop:
                  "15px",
              }}
            >
              {
                note.description
              }
            </p>

            <a
              href={`tel:${note.mobile}`}
              style={{
                display:
                  "block",
                textAlign:
                  "center",
                marginTop:
                  "15px",
                padding:
                  "12px",
                borderRadius:
                  "12px",
                background:
                  "#111827",
                color:
                  "#fff",
                textDecoration:
                  "none",
              }}
            >
              Contact Family
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default DeathNotes;