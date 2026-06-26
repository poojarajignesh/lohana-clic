import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";

function Jobs() {
  const [jobs, setJobs] =
    useState([]);

  const [search, setSearch] =
    useState("");

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
          querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (job) =>
                job.status ===
                "Approved"
            );

        setJobs(jobsList);
      } catch (error) {
        console.log(error);
      }
    };

  const filteredJobs =
    jobs.filter(
      (job) =>
        job.jobTitle
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        job.companyName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        job.jobLocation
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
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
          Jobs
        </h1>

        <p
          style={{
            marginTop: "8px",
          }}
        >
          Find Career Opportunities
        </p>
      </div>

      <input
        type="text"
        placeholder="Search Jobs"
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
          marginBottom: "20px",
        }}
      />

      <p
        style={{
          fontWeight: "600",
          marginBottom: "15px",
        }}
      >
        Total Jobs :
        {filteredJobs.length}
      </p>

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
            <h3
              style={{
                marginTop: 0,
                color:
                  "#2D1B7E",
              }}
            >
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
              🎓{" "}
              {
                job.qualification
              }
            </p>

            <p>
              💼{" "}
              {job.experience}
            </p>

            <p>
              📝{" "}
              {
                job.description
              }
            </p>

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
                href={`tel:${job.mobile}`}
                style={{
                  flex: 1,
                  textAlign:
                    "center",
                  padding:
                    "12px",
                  background:
                    "#4F46E5",
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
                href={`https://wa.me/91${job.whatsapp}`}
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

export default Jobs;