
import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";


function AddFamily() {
  const { id } = useParams();

const navigate = useNavigate();

const isEdit = !!id;
useEffect(() => {
  if (!isEdit) return;

  loadFamily();
}, []);

const loadFamily = async () => {
  try {
    const docRef = doc(
      db,
      "families",
      id
    );

    const docSnap =
      await getDoc(docRef);

    if (docSnap.exists()) {
      setFormData(
        docSnap.data()
      );
    }
  } catch (error) {
    console.log(error);
  }
};
  const [formData, setFormData] =
    useState({
      district: "",
      taluka: "",
      village: "",
      headName: "",
      fatherName: "",
      grandFatherName: "",
      nativePlace: "",
      currentPlace: "",
      mosalAtak: "",
      address: "",
      mobile1: "",
      mobile2: "",
      whatsapp: "",
      email: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

 const handleSubmit = async (e) => {
e.preventDefault();

try {
const counterRef = doc(
db,
"counters",
"family"
);


const counterSnap =
  await getDoc(counterRef);

const counter =
  counterSnap.data()
    .familyCounter;

const familyId =
"LCF" +
String(counter).padStart(
6,
"0"
);

if (isEdit) {
  await updateDoc(
    doc(db, "families", id),
    {
      ...formData,
    }
  );

  alert(
    "Family Updated Successfully"
  );

  navigate(
    `/family/${id}`
  );

  return;
}

if (isEdit) {
  await updateDoc(
    doc(db, "families", id),
    {
      ...formData,
    }
  );

  alert(
    "Family Updated Successfully"
  );

  navigate(
    `/family/${id}`
  );

  return;
}

await addDoc(
  collection(db, "families"),
  {
    ...formData,
    familyId,
    status: "Pending",
    createdAt:
      serverTimestamp(),
  }
);

await updateDoc(
  counterRef,
  {
    familyCounter:
      counter + 1,
  }
);

alert(
  `Family Saved Successfully\n${familyId}`
);

navigate("/");




} catch (error) {
console.log(error);

```
alert(
  "Error Saving Family"
);
```

}
};


  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "0 auto",
        padding: "20px",
        paddingBottom: "40px",
      }}
    >
      <h1
        style={{
          color: "#2D1B7E",
          marginBottom: "20px",
        }}
      >
        Add Family
      </h1>

      <form
        onSubmit={handleSubmit}
      >
        <InputField
          label="District"
          name="district"
          value={
            formData.district
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Taluka"
          name="taluka"
          value={
            formData.taluka
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
          label="Head Name"
          name="headName"
          value={
            formData.headName
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Father Name"
          name="fatherName"
          value={
            formData.fatherName
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Grand Father Name"
          name="grandFatherName"
          value={
            formData.grandFatherName
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Native Place"
          name="nativePlace"
          value={
            formData.nativePlace
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Current Place"
          name="currentPlace"
          value={
            formData.currentPlace
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Mosal Atak"
          name="mosalAtak"
          value={
            formData.mosalAtak
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Address"
          name="address"
          value={
            formData.address
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Mobile 1"
          name="mobile1"
          value={
            formData.mobile1
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Mobile 2"
          name="mobile2"
          value={
            formData.mobile2
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Whatsapp"
          name="whatsapp"
          value={
            formData.whatsapp
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="Email"
          name="email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius:
              "16px",
            background:
              "linear-gradient(135deg,#FF5A1F,#FF7A45)",
            color: "#fff",
            fontWeight: "700",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
         {isEdit
  ? "Update Family"
  : "Save Family"}
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

export default AddFamily;