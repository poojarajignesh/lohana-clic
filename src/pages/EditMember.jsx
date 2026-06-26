import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase/config";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

function EditMember() {
  const { id } = useParams();

  const [member, setMember] =
    useState({
      fullName: "",
      relation: "",
      mobile: "",
      bloodGroup: "",
      education: "",
      occupation: "",
      maritalStatus: "",
      dob: "",
    });

  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      const docRef = doc(
        db,
        "members",
        id
      );

      const docSnap =
        await getDoc(docRef);

      if (docSnap.exists()) {
        setMember(
          docSnap.data()
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleUpdate =
    async () => {
      try {
        await updateDoc(
          doc(
            db,
            "members",
            id
          ),
          member
        );

        alert(
          "Member Updated Successfully"
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
      }}
    >
      <h1
        style={{
          color: "#2D1B7E",
        }}
      >
        Edit Member
      </h1>

      <input
        type="text"
        name="fullName"
        value={member.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        style={inputStyle}
      />

      <input
        type="text"
        name="relation"
        value={member.relation}
        onChange={handleChange}
        placeholder="Relation"
        style={inputStyle}
      />

      <input
        type="text"
        name="mobile"
        value={member.mobile}
        onChange={handleChange}
        placeholder="Mobile"
        style={inputStyle}
      />

      <input
        type="text"
        name="bloodGroup"
        value={member.bloodGroup}
        onChange={handleChange}
        placeholder="Blood Group"
        style={inputStyle}
      />

      <input
        type="text"
        name="education"
        value={member.education}
        onChange={handleChange}
        placeholder="Education"
        style={inputStyle}
      />

      <input
        type="text"
        name="occupation"
        value={member.occupation}
        onChange={handleChange}
        placeholder="Occupation"
        style={inputStyle}
      />

      <input
        type="text"
        name="maritalStatus"
        value={
          member.maritalStatus
        }
        onChange={handleChange}
        placeholder="Marital Status"
        style={inputStyle}
      />

      <input
        type="text"
        name="dob"
        value={member.dob}
        onChange={handleChange}
        placeholder="DOB"
        style={inputStyle}
      />

      <button
        onClick={handleUpdate}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "12px",
          background:
            "#2D1B7E",
          color: "#fff",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        Update Member
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  boxSizing: "border-box",
};

export default EditMember;