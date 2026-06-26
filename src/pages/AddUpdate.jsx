import { useState } from "react";
import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function AddUpdate() {
  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
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
            "updates"
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
          "Update Added Successfully"
        );

        setFormData({
          title: "",
          description: "",
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
        Add Community Update
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <div
          style={{
            marginBottom:
              "15px",
          }}
        >
          <label>
            Title
          </label>

          <input
            type="text"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
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
            rows="6"
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
              "#2D1B7E",
            color:
              "#fff",
            fontWeight:
              "700",
          }}
        >
          Save Update
        </button>
      </form>
    </div>
  );
}

export default AddUpdate;