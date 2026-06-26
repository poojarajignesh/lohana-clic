import { useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function AddMember() {
  const { familyId } =
    useParams();
const [photo, setPhoto] =
  useState(null);

const [uploading, setUploading] =
  useState(false);

  const [formData, setFormData] =
  useState({
    fullName: "",
    relation: "",
    dob: "",
    mobile: "",
    bloodGroup: "",
    education: "",
    occupation: "",
    maritalStatus: "",

    gender: "",
    height: "",
    photoUrl: "",
    isMatrimony: false,
    isBloodDonor: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleCheckbox = (e) => {
  setFormData({
    ...formData,
    isMatrimony:
      e.target.checked,
  });
};
const handleBloodDonor = (e) => {
  setFormData({
    ...formData,
    isBloodDonor: e.target.checked,
  });
};
const uploadImage =
  async () => {
    if (!photo) return "";

    setUploading(true);

    const data =
      new FormData();

    data.append(
      "file",
      photo
    );

    data.append(
      "upload_preset",
      "lohana_clic_upload"
    );

    const res =
      await fetch(
        "https://api.cloudinary.com/v1_1/dzdbtwqon/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

    const result =
      await res.json();

    setUploading(false);

    return result.secure_url;
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
    const photoUrl =
  await uploadImage();

await addDoc(
  collection(
    db,
    "members"
  ),
  {
  ...formData,

  photoUrl,

  familyId,

  familyDocId:
    familyId,

  isMatrimony:
    formData.isMatrimony ||
    false,

  createdAt:
    serverTimestamp(),
}
);

      alert(
        "Member Added Successfully"
      );

      setFormData({
  fullName: "",
  relation: "",
  dob: "",
  mobile: "",
  bloodGroup: "",
  education: "",
  occupation: "",
  maritalStatus: "",

  gender: "",
  height: "",
  photoUrl: "",

  isMatrimony: false,
  isBloodDonor: false,
});

    } catch (error) {
      console.log(error);
      alert(
        "Error Saving Member"
      );
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
        Add Member
      </h1>

      <p>
        Family ID:
        {familyId}
      </p>

      <form
        onSubmit={handleSubmit}
      >
        <InputField
          label="Full Name"
          name="fullName"
          value={
            formData.fullName
          }
          onChange={
            handleChange
            
          }
          
        />
        

        <InputField
          label="Relation"
          name="relation"
          value={
            formData.relation
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Date Of Birth"
          name="dob"
          value={formData.dob}
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
          label="Blood Group"
          name="bloodGroup"
          value={
            formData.bloodGroup
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Education"
          name="education"
          value={
            formData.education
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Occupation"
          name="occupation"
          value={
            formData.occupation
          }
          onChange={
            handleChange
          }
        />
<InputField
  label="Gender"
  name="gender"
  value={formData.gender}
  onChange={handleChange}
/>

<InputField
  label="Height"
  name="height"
  value={formData.height}
  onChange={handleChange}
/>

<div
  style={{
    marginBottom: "15px",
  }}
>
  <label>
    Member Photo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setPhoto(
        e.target.files[0]
      )
    }
  />
</div>
        <InputField
          label="Marital Status"
          name="maritalStatus"
          value={
            formData.maritalStatus
          }
          onChange={
            handleChange
          }
        />

        <div
  style={{
    marginBottom: "15px",
  }}
>
  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "600",
    }}
  >
    <input
      type="checkbox"
      checked={
        formData.isMatrimony
      }
      onChange={
        handleCheckbox
        
      }
      
      
    />
    
    Add To Matrimony
  </label>
</div>
<div
  style={{
    marginBottom: "15px",
  }}
>
  <label
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontWeight: "600",
    }}
  >
    <input
      type="checkbox"
      checked={formData.isBloodDonor}
      onChange={handleBloodDonor}
    />
    Available For Blood Donation
  </label>
</div>
       <button
  type="submit"
  style={{
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg,#FF5A1F,#FF7A45)",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  {uploading
    ? "Uploading..."
    : "Save Member"}
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
        marginBottom: "15px",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: "600",
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
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border:
            "1px solid #ddd",
        }}
      />
    </div>
  );
}

export default AddMember;   