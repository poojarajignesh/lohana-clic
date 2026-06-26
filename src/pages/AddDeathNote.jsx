import { useState } from "react";
import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function AddDeathNote() {
  const [formData, setFormData] =
    useState({
      name: "",
      village: "",
      age: "",
      deathDate: "",
      contactPerson: "",
      mobile: "",
      description: "",
      photoUrl: "",
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
            "deathNotes"
          ),
          {
            ...formData,
            status:
              "Pending",
            createdAt:
              serverTimestamp(),
          }
        );

        alert(
          "Death Note Added Successfully"
        );

        setFormData({
          name: "",
          village: "",
          age: "",
          deathDate: "",
          contactPerson: "",
          mobile: "",
          description: "",
          photoUrl: "",
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
          color: "#2D1B7E",
        }}
      >
        Add Death Note
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <InputField
          label="Name"
          name="name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Village"
          name="village"
          value={
            formData.village
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Age"
          name="age"
          value={
            formData.age
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Death Date"
          name="deathDate"
          value={
            formData.deathDate
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Contact Person"
          name="contactPerson"
          value={
            formData.contactPerson
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Mobile"
          name="mobile"
          value={
            formData.mobile
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Photo URL"
          name="photoUrl"
          value={
            formData.photoUrl
          }
          onChange={
            handleChange
          }
        />

        <div
          style={{
            marginBottom:
              "15px",
          }}
        >
          <label>
            Description
          </label>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            rows="5"
            style={{
              width:
                "100%",
              padding:
                "12px",
              borderRadius:
                "12px",
              border:
                "1px solid #ddd",
            }}
          />
        </div>

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
              "16px",
            background:
              "#111827",
            color:
              "#fff",
            fontWeight:
              "700",
            cursor:
              "pointer",
          }}
        >
          Save Death Note
        </button>
      </form>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div
      style={{
        marginBottom:
          "15px",
      }}
    >
      <label
        style={{
          display:
            "block",
          marginBottom:
            "6px",
          fontWeight:
            "600",
        }}
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width:
            "100%",
          padding:
            "12px",
          borderRadius:
            "12px",
          border:
            "1px solid #ddd",
        }}
      />
    </div>
  );
}

export default AddDeathNote;