import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

function BusinessApproval() {
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const snap = await getDocs(collection(db, "businesses"));

      const list = snap.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((b) => b.status === "Pending");

      setBusinesses(list);
    } catch (error) {
      console.log(error);
    }
  };

  const approveBusiness = async (id) => {
    try {
      await updateDoc(doc(db, "businesses", id), {
        status: "Approved",
      });

      loadBusinesses();
    } catch (error) {
      console.log(error);
    }
  };

  const rejectBusiness = async (id) => {
    if (!window.confirm("Reject this business?")) return;

    try {
      await updateDoc(doc(db, "businesses", id), {
        status: "Rejected",
      });

      loadBusinesses();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredBusinesses = businesses.filter((b) => {
    const text = search.toLowerCase();

    return (
      (b.businessName || "")
        .toLowerCase()
        .includes(text) ||
      (b.ownerName || b.ownerHeadName || "")
        .toLowerCase()
        .includes(text) ||
      (b.category || "")
        .toLowerCase()
        .includes(text) ||
      (b.city || "")
        .toLowerCase()
        .includes(text)
    );
  });

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
      <h1
        style={{
          color: "#2D1B7E",
          marginBottom: "15px",
        }}
      >
        Business Approval
      </h1>

      <input
        type="text"
        placeholder="Search Business..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "14px",
          border: "1px solid #ddd",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      <p
        style={{
          fontWeight: "700",
          marginBottom: "20px",
        }}
      >
        Pending : {filteredBusinesses.length}
      </p>

      {filteredBusinesses.map((b) => (
        <div
          key={b.id}
          style={{
            background: "#fff",
            borderRadius: "22px",
            padding: "18px",
            marginBottom: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          <h2>{b.businessName}</h2>

          <p>
            <b>Owner :</b>{" "}
            {b.ownerName || b.ownerHeadName}
          </p>

          <p>
            <b>Category :</b> {b.category}
          </p>

          <p>
            <b>Sub Category :</b>{" "}
            {b.subCategory}
          </p>

          <p>
            <b>City :</b> {b.city}
          </p>

          <p>
            <b>Mobile :</b> {b.mobile}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <button
              onClick={() =>
                approveBusiness(b.id)
              }
              style={{
                padding: "12px",
                border: "none",
                borderRadius: "14px",
                background: "#16A34A",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Approve
            </button>

            <button
              onClick={() =>
                rejectBusiness(b.id)
              }
              style={{
                padding: "12px",
                border: "none",
                borderRadius: "14px",
                background: "#DC2626",
                color: "#fff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {filteredBusinesses.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "#777",
          }}
        >
          No Pending Businesses
        </p>
      )}
    </div>
  );
}

export default BusinessApproval;