import { useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { loginFamily } from "../auth/Auth";

function FamilyLogin() {
  const [familyId, setFamilyId] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleLogin =
    async () => {
      if (
        familyId === "" ||
        mobile === ""
      ) {
        alert(
          "Enter Family ID & Mobile"
        );
        return;
      }

      setLoading(true);

      try {
        const snapshot =
          await getDocs(
            collection(
              db,
              "families"
            )
          );

        const family =
          snapshot.docs.find(
            (doc) => {
              const data =
                doc.data();

              return (
                data.familyId
                  ?.toUpperCase() ===
                  familyId.toUpperCase() &&
                data.mobile1 ===
                  mobile
              );
            }
          );

        if (!family) {
          alert(
            "Invalid Family ID or Mobile Number"
          );

          setLoading(false);
          return;
        }

        const data =
          family.data();

        loginFamily({
          id: family.id,
          ...data,
        });

        console.log("Saved", {
  id: family.id,
  ...data,
});

        alert(
          "Login Successful"
        );

        navigate("/");
      } catch (error) {
        console.log(error);

        alert(
          "Something went wrong"
        );
      }

      setLoading(false);
    };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1>
        Family Login
      </h1>

      <input
        type="text"
        placeholder="Family ID"
        value={familyId}
        onChange={(e) =>
          setFamilyId(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) =>
          setMobile(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <button
        onClick={
          handleLogin
        }
        style={buttonStyle}
      >
        {loading
          ? "Please Wait..."
          : "Login"}
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  marginBottom: "15px",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "12px",
  background:
    "#2D1B7E",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

export default FamilyLogin;