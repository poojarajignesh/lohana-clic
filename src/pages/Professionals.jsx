import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

function Professionals() {
  const [professionals, setProfessionals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProfessionals();
  }, []);

  const loadProfessionals = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "professionals")
      );

      const list = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (item) =>
            item.status === "Approved"
        );

      setProfessionals(list);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered =
    professionals.filter(
      (item) =>
        item.fullName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.profession
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.city
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
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#2D1B7E",
        }}
      >
        Professionals
      </h1>

      <input
        type="text"
        placeholder="Search Professional"
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
          border: "1px solid #ddd",
          marginBottom: "20px",
        }}
      />

      <p>
        Total Professionals :
        {filtered.length}
      </p>

      {filtered.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "18px",
            marginBottom: "15px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#2D1B7E",
            }}
          >
            {item.fullName}
          </h3>

          <p>
            💼 {item.profession}
          </p>

          <p>
            📍 {item.city}
          </p>

          <p>
            ⭐ {item.experience}
          </p>

          <a
            href={`tel:${item.mobile}`}
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "15px",
              padding: "12px",
              background: "#2D1B7E",
              color: "#fff",
              borderRadius: "12px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Call
          </a>
        </div>
      ))}
    </div>
  );
}

export default Professionals;