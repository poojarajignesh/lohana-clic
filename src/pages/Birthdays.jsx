import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";

function Birthdays() {
  const [birthdays, setBirthdays] =
    useState([]);

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const fetchBirthdays =
    async () => {
      try {
        const querySnapshot =
          await getDocs(
            collection(
              db,
              "members"
            )
          );

        const today =
          new Date();

        const todayDate =
          today.getDate();

        const todayMonth =
          today.getMonth() +
          1;

        const birthdayList =
          querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (member) => {
                if (
                  !member.dob
                )
                  return false;

                try {
                  const parts =
                    member.dob.split(
                      "/"
                    );

                  return (
                    Number(
                      parts[0]
                    ) ===
                      todayDate &&
                    Number(
                      parts[1]
                    ) ===
                      todayMonth
                  );
                } catch {
                  return false;
                }
              }
            );

        setBirthdays(
          birthdayList
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
      <div
        style={{
          background:
            "linear-gradient(135deg,#F59E0B,#F97316)",
          color: "#fff",
          padding: "25px",
          borderRadius:
            "24px",
          marginBottom:
            "20px",
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          🎂 Birthdays
        </h1>

        <p>
          Today's Birthday
          Wishes
        </p>
      </div>

      {birthdays.length ===
      0 ? (
        <div
          style={{
            textAlign:
              "center",
            color:
              "#666",
          }}
        >
          No Birthday
          Today
        </div>
      ) : (
        birthdays.map(
          (member) => (
            <div
              key={
                member.id
              }
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
              <div
                style={{
                  display:
                    "flex",
                  gap: "15px",
                  alignItems:
                    "center",
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
                        "#FEF3C7",
                      display:
                        "flex",
                      justifyContent:
                        "center",
                      alignItems:
                        "center",
                      fontWeight:
                        "700",
                      fontSize:
                        "24px",
                    }}
                  >
                    {member.fullName?.charAt(
                      0
                    )}
                  </div>
                )}

                <div>
                  <h3>
                    {
                      member.fullName
                    }
                  </h3>

                  <p>
                    🎉 Happy
                    Birthday
                  </p>
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default Birthdays;
