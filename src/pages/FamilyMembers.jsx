import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLoggedFamily } from "../auth/Auth";

import { db } from "../firebase/config";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function FamilyMembers() {
  const { familyId } = useParams();

  const navigate =
    useNavigate();

    const loggedFamily = getLoggedFamily();

const isOwner =
  loggedFamily?.familyId === familyId;

  const [members, setMembers] =
    useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this member?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        await deleteDoc(
          doc(
            db,
            "members",
            id
          )
        );

        alert(
          "Member Deleted"
        );

        fetchMembers();
      } catch (error) {
        console.log(error);
      }
    };

  const fetchMembers =
    async () => {
      try {
        const querySnapshot =
          await getDocs(
            collection(
              db,
              "members"
            )
          );

        const memberList =
          querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (member) =>
                member.familyId ===
                familyId
            );

        setMembers(
          memberList
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
        minHeight:
          "100vh",
      }}
    >
      <h1
        style={{
          color:
            "#2D1B7E",
          marginBottom:
            "5px",
        }}
      >
        Family Members
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom:
            "20px",
        }}
      >
        Total Members :
        {members.length}
      </p>

      {members.map(
        (member) => (
          <div
            key={
              member.id
            }
            style={{
              background:
                "#fff",
              borderRadius:
                "24px",
              padding:
                "20px",
              marginBottom:
                "15px",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display:
                  "flex",
                gap: "15px",
                alignItems:
                  "center",
                marginBottom:
                  "15px",
              }}
            >
              {member.photoUrl ? (
                <img
                  src={
                    member.photoUrl
                  }
                  alt=""
                  style={{
                    width:
                      "70px",
                    height:
                      "70px",
                    borderRadius:
                      "50%",
                    objectFit:
                      "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width:
                      "70px",
                    height:
                      "70px",
                    borderRadius:
                      "50%",
                    background:
                      "#E5E7EB",
                    display:
                      "flex",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    fontSize:
                      "28px",
                    fontWeight:
                      "700",
                    color:
                      "#2563EB",
                  }}
                >
                  {member.fullName?.charAt(
                    0
                  )}
                </div>
              )}

              <div>
                <h3
                  style={{
                    margin:
                      0,
                    color:
                      "#1E3A8A",
                  }}
                >
                  {
                    member.fullName
                  }
                </h3>

                <p
                  style={{
                    margin:
                      "4px 0",
                    color:
                      "#666",
                  }}
                >
                  {
                    member.relation
                  }
                </p>

                {member.isMatrimony && (
                  <span
                    style={{
                      background:
                        "#DCFCE7",
                      color:
                        "#166534",
                      padding:
                        "4px 10px",
                      borderRadius:
                        "20px",
                      fontSize:
                        "12px",
                      fontWeight:
                        "600",
                    }}
                  >
                    💖 Matrimony
                  </span>
                )}
              </div>
            </div>

            <p>
              📱{" "}
              {member.mobile ||
                "-"}
            </p>

            <p>
              🩸{" "}
              {member.bloodGroup ||
                "-"}
            </p>

            <p>
              🎓{" "}
              {member.education ||
                "-"}
            </p>

            <p>
              💼{" "}
              {member.occupation ||
                "-"}
            </p>

            <p>
              💍{" "}
              {member.maritalStatus ||
                "-"}
            </p>

           {isOwner && (
  <div
    style={{
      display: "flex",
      gap: "10px",
      marginTop: "15px",
    }}
  >
    <button
      onClick={() =>
        navigate(`/edit-member/${member.id}`)
      }
      style={{
        flex: 1,
        padding: "10px",
        border: "none",
        borderRadius: "10px",
        background: "#2563EB",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Edit
    </button>

    <button
      onClick={() =>
        handleDelete(member.id)
      }
      style={{
        flex: 1,
        padding: "10px",
        border: "none",
        borderRadius: "10px",
        background: "#DC2626",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  </div>
)}
          </div>
        )
      )}
    </div>
  );
}

export default FamilyMembers;