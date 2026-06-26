import { useState } from "react";
import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function AddAdvertisement() {
  const [formData, setFormData] =
    useState({
      title: "",
      imageUrl: "",
      link: "",
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
            "advertisements"
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
          "Advertisement Added"
        );

        setFormData({
          title: "",
          imageUrl: "",
          link: "",
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
        Add Advertisement
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={
            formData.title
          }
          onChange={
            handleChange
          }
          style={inputStyle}
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={
            formData.imageUrl
          }
          onChange={
            handleChange
          }
          style={inputStyle}
        />

        <input
          type="text"
          name="link"
          placeholder="Website / WhatsApp Link"
          value={
            formData.link
          }
          onChange={
            handleChange
          }
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          Save Advertisement
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "1px solid #ddd",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "14px",
  background: "#2D1B7E",
  color: "#fff",
  fontWeight: "700",
};

export default AddAdvertisement;