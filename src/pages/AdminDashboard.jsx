import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/config";

function AdminDashboard() {
  const [counts, setCounts] =
    useState({
      families: 0,
      members: 0,
      businesses: 0,
      jobs: 0,
      bloodRequests: 0,
      updates: 0,
      deathNotes: 0,
    });

  useEffect(() => {
    loadCounts();
  }, []);

  const loadCounts =
    async () => {
      try {
        const families =
          await getDocs(
            collection(
              db,
              "families"
            )
          );

        const members =
          await getDocs(
            collection(
              db,
              "members"
            )
          );

        const businesses =
          await getDocs(
            collection(
              db,
              "businesses"
            )
          );

        const jobs =
          await getDocs(
            collection(
              db,
              "jobs"
            )
          );

        const bloodRequests =
          await getDocs(
            collection(
              db,
              "bloodRequests"
            )
          );

        const updates =
          await getDocs(
            collection(
              db,
              "updates"
            )
          );

        const deathNotes =
          await getDocs(
            collection(
              db,
              "deathNotes"
            )
          );

        setCounts({
          families:
            families.size,
          members:
            members.size,
          businesses:
            businesses.size,
          jobs: jobs.size,
          bloodRequests:
            bloodRequests.size,
          updates:
            updates.size,
          deathNotes:
            deathNotes.size,
        });
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
      }}
    >
      <h1
        style={{
          color:
            "#2D1B7E",
        }}
      >
        Master Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "12px",
        }}
      >
        <Card
          title="Families"
          value={
            counts.families
          }
          icon="👨‍👩‍👧"
        />

        <Card
          title="Members"
          value={
            counts.members
          }
          icon="👤"
        />

        <Card
          title="Businesses"
          value={
            counts.businesses
          }
          icon="🏢"
        />

        <Card
          title="Jobs"
          value={
            counts.jobs
          }
          icon="💼"
        />

        <Card
          title="Blood"
          value={
            counts.bloodRequests
          }
          icon="🩸"
        />

        <Card
          title="Updates"
          value={
            counts.updates
          }
          icon="📢"
        />

        <Card
          title="Death Notes"
          value={
            counts.deathNotes
          }
          icon="🕯️"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
}) {
  return (
    <div
      style={{
        background:
          "#fff",
        borderRadius:
          "20px",
        padding: "20px",
        textAlign:
          "center",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          fontSize: "28px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          margin:
            "10px 0 5px",
        }}
      >
        {value}
      </h2>

      <p>{title}</p>
    </div>
  );
}

export default AdminDashboard;