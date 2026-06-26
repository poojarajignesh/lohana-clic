import { useState } from "react";
import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function AddProfessional() {
  const [formData, setFormData] =
    useState({
      fullName: "",
      profession: "",
      mobile: "",
      city: "",
      experience: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await addDoc(
          collection(
            db,
            "professionals"
          ),
          {
            ...formData,
            status:
              "Approved",
            createdAt:
              serverTimestamp(),
          }
        );

        alert(
          "Professional Added"
        );

        setFormData({
          fullName: "",
          profession: "",
          mobile: "",
          city: "",
          experience: "",
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
      <h1>
        Add Professional
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <Input
          name="fullName"
          placeholder="Full Name"
          value={
            formData.fullName
          }
          onChange={
            handleChange
          }
        />

        <Input
          name="profession"
          placeholder="Profession"
          value={
            formData.profession
          }
          onChange={
            handleChange
          }
        />

        <Input
          name="mobile"
          placeholder="Mobile"
          value={
            formData.mobile
          }
          onChange={
            handleChange
          }
        />

        <Input
          name="city"
          placeholder="City"
          value={
            formData.city
          }
          onChange={
            handleChange
          }
        />

        <Input
          name="experience"
          placeholder="Experience"
          value={
            formData.experience
          }
          onChange={
            handleChange
          }
        />

        <button
          type="submit"
          style={{
            width:
              "100%",
            padding:
              "14px",
            border:
              "none",
            borderRadius:
              "14px",
            background:
              "#2D1B7E",
            color:
              "#fff",
            fontWeight:
              "700",
          }}
        >
          Save Professional
        </button>
      </form>
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        width:
          "100%",
        padding:
          "14px",
        marginBottom:
          "15px",
        borderRadius:
          "12px",
        border:
          "1px solid #ddd",
      }}
    />
  );
}

export default AddProfessional;