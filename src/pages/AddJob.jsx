import { useEffect, useState } from "react";

import { db } from "../firebase/config";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AdminJobs() {
  const [jobs, setJobs] =
    useState([]);

  const [activeTab, setActiveTab] =
    useState("Pending");

  useEffect(() => {
    fetchJobs();
  }, []);

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

        const jobsList =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setJobs(jobsList);
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
            "jobs",
            id
          ),
          {
            status,
          }
        );

        fetchJobs();
      } catch (error) {
        console.log(error);
      }
    };

  const removeJob =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this job?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteDoc(
          doc(
            db,
            "jobs",
            id
          )
        );

        fetchJobs();
      } catch (error) {
        console.log(error);
      }
    };

  const filteredJobs =
    jobs.filter(
      (job) =>
        activeTab === "All"
          ? true
          : job.status ===
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
        Jobs Admin
      </h1>

      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          marginBottom: "20px",
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
              setActiveTab(tab)
            }
            style={{
              padding:
                "10px 16px",
              border: "none",
              borderRadius:
                "12px",
              cursor: "pointer",
              background:
                activeTab === tab
                  ? "#2D1B7E"
                  : "#E5E7EB",
              color:
                activeTab === tab
                  ? "#fff"
                  : "#000",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredJobs.map(
        (job) => (
          <div
            key={job.id}
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
            <h3>
              {job.jobTitle}
            </h3>

            <p>
              🏢{" "}
              {job.companyName}
            </p>

            <p>
              📍{" "}
              {job.jobLocation}
            </p>

            <p>
              💰{" "}
              {job.salary}
            </p>

            <p>
              📞{" "}
              {job.mobile}
            </p>

            <p>
              Status :
              {" "}
              <b>
                {job.status}
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
                    job.id,
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
                    job.id,
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
                  removeJob(
                    job.id
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

export default AdminJobs;