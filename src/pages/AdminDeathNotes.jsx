import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AdminDeathNotes() {
  const [notes, setNotes] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("Pending");

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
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setNotes(noteList);
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
            "deathNotes",
            id
          ),
          {
            status,
          }
        );

        fetchNotes();
      } catch (error) {
        console.log(error);
      }
    };

  const removeNote =
    async (id) => {
      if (
        !window.confirm(
          "Delete Death Note?"
        )
      )
        return;

      try {
        await deleteDoc(
          doc(
            db,
            "deathNotes",
            id
          )
        );

        fetchNotes();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredNotes =
    notes.filter(
      (note) =>
        activeTab ===
        "All"
          ? true
          : note.status ===
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
          color: "#111827",
        }}
      >
        Death Notes Admin
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
                  ? "#111827"
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

      {filteredNotes.map(
        (note) => (
          <div
            key={note.id}
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
              {note.name}
            </h3>

            <p>
              📍{" "}
              {
                note.village
              }
            </p>

            <p>
              📞{" "}
              {
                note.mobile
              }
            </p>

            <p>
              Status :
              <b>
                {" "}
                {
                  note.status
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
                    note.id,
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
                }}
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    note.id,
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
                }}
              >
                Reject
              </button>

              <button
                onClick={() =>
                  removeNote(
                    note.id
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

export default AdminDeathNotes;