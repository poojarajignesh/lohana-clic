import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Admin() {
  const [businesses, setBusinesses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("All");

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
        querySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      setBusinesses(businessList);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await updateDoc(
        doc(db, "businesses", id),
        {
          status,
        }
      );

      fetchBusinesses();
    } catch (error) {
      console.log(error);
    }
  };

  const removeBusiness = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this business?"
      );

    if (!confirmDelete) return;

    try {
      await deleteDoc(
        doc(db, "businesses", id)
      );

      fetchBusinesses();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBusinesses =
    businesses.filter((business) => {
      const matchesSearch =
        business.businessName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        business.category
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesTab =
        activeTab === "All"
          ? true
          : business.status ===
            activeTab;

      return (
        matchesSearch &&
        matchesTab
      );
    });

  const totalCount =
    businesses.length;

  const approvedCount =
    businesses.filter(
      (b) =>
        b.status === "Approved"
    ).length;

  const pendingCount =
    businesses.filter(
      (b) =>
        b.status === "Pending"
    ).length;

  const rejectedCount =
    businesses.filter(
      (b) =>
        b.status === "Rejected"
    ).length;

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        padding: "20px",
        paddingBottom: "40px",
      }}
    >
      <h1
        style={{
          color: "#2D1B7E",
          marginBottom: "20px",
        }}
      >
        Admin Panel
      </h1>

      {/* Stats */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          title="Total"
          value={totalCount}
        />

        <StatCard
          title="Approved"
          value={approvedCount}
        />

        <StatCard
          title="Pending"
          value={pendingCount}
        />

        <StatCard
          title="Rejected"
          value={rejectedCount}
        />
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search Business"
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

      {/* Tabs */}

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
                  : "#eee",
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

      {/* Business Cards */}

      {filteredBusinesses.map(
        (business) => (
          <div
            key={business.id}
            style={{
              background:
                "#fff",
              padding: "16px",
              borderRadius:
                "16px",
              marginBottom:
                "15px",
              boxShadow:
                "0 6px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3
              style={{
                color:
                  "#2D1B7E",
                marginBottom:
                  "8px",
              }}
            >
              {
                business.businessName
              }
            </h3>

            <p>
              📂{" "}
              {
                business.category
              }
            </p>

            <p>
              📍 {business.city}
            </p>

            <p>
              📞{" "}
              {
                business.mobile
              }
            </p>

            <p
              style={{
                marginTop:
                  "8px",
                fontWeight:
                  "600",
              }}
            >
              Status:{" "}
              {
                business.status
              }
            </p>

            <div
              style={{
                display:
                  "flex",
                gap: "8px",
                marginTop:
                  "12px",
                flexWrap:
                  "wrap",
              }}
            >
              <button
                onClick={() =>
                  updateStatus(
                    business.id,
                    "Approved"
                  )
                }
                style={
                  approveBtn
                }
              >
                Approve
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    business.id,
                    "Rejected"
                  )
                }
                style={
                  rejectBtn
                }
              >
                Reject
              </button>

              <button
                onClick={() =>
                  removeBusiness(
                    business.id
                  )
                }
                style={
                  deleteBtn
                }
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

function StatCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "15px",
        textAlign: "center",
        boxShadow:
          "0 6px 15px rgba(0,0,0,0.08)",
      }}
    >
      <h3
        style={{
          color: "#2D1B7E",
        }}
      >
        {value}
      </h3>

      <p>{title}</p>
    </div>
  );
}

const approveBtn = {
  background: "#22C55E",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
};

const rejectBtn = {
  background: "#F59E0B",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#EF4444",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default Admin;