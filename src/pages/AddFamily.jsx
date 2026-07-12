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

import {
  districts,
  getTalukas
} from "../data/locations";

const states=["Gujarat"];

function AddFamily() {

  const { id } = useParams();

  const navigate = useNavigate();

  const isEdit = !!id;

  const [talukas, setTalukas] = useState([]);

  const [formData, setFormData] = useState({

    state: "Gujarat",

    district: "",
    taluka: "",

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

  useEffect(() => {

    if (isEdit) {
      loadFamily();
    }

  }, []);

  useEffect(() => {

    if (formData.district) {

      setTalukas(
        getTalukas(
          formData.district
        )
      );

    }

  }, [formData.district]);

  

  const loadFamily = async () => {

    try {

      const snap = await getDoc(
        doc(
          db,
          "families",
          id
        )
      );

      if (snap.exists()) {

        const data = snap.data();

        setFormData(data);

        setTalukas(
          getTalukas(
            data.district
          )
        );

      }

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "district") {

      setFormData({

        ...formData,

        district: value,

        taluka: "",

    
      });

      return;

    }

    if (name === "taluka") {

      setFormData({

        ...formData,

        taluka: value,

    
      });

      return;

    }

    setFormData({

      ...formData,

      [name]: value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isEdit) {

        await updateDoc(

          doc(
            db,
            "families",
            id
          ),

          {
            ...formData,
          }

        );

        alert(
          "Family Updated Successfully"
        );

        navigate(`/family/${id}`);

        return;

      }

      const counterRef = doc(
        db,
        "counters",
        "family"
      );

      const counterSnap =
        await getDoc(counterRef);

      const counter =
        counterSnap.data().familyCounter;

      const familyId =
        "LCF" +
        String(counter).padStart(
          6,
          "0"
        );
              await addDoc(
        collection(db, "families"),
        {
          ...formData,
          familyId,
          status: "Pending",
          createdAt: serverTimestamp(),
        }
      );

      await updateDoc(
        counterRef,
        {
          familyCounter: counter + 1,
        }
      );

      alert(
        `Family Saved Successfully\n${familyId}`
      );

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Error Saving Family");

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

        {isEdit
          ? "Edit Family"
          : "Add Family"}

      </h1>

      <form
        onSubmit={handleSubmit}
      >

        <SelectField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          options={states}
        />

        <SelectField
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange}
          options={districts}
        />

        <SelectField
          label="Taluka"
          name="taluka"
          value={formData.taluka}
          onChange={handleChange}
          options={talukas}
        />

        <InputField
          label="Head Name"
          name="headName"
          value={formData.headName}
          onChange={handleChange}
        />

        <InputField
          label="Father Name"
          name="fatherName"
          value={formData.fatherName}
          onChange={handleChange}
        />

        <InputField
          label="Grand Father Name"
          name="grandFatherName"
          value={formData.grandFatherName}
          onChange={handleChange}
        />

        <InputField
          label="Native Place"
          name="nativePlace"
          value={formData.nativePlace}
          onChange={handleChange}
        />

        <InputField
          label="Current Place"
          name="currentPlace"
          value={formData.currentPlace}
          onChange={handleChange}
        />

        <InputField
          label="Mosal Atak"
          name="mosalAtak"
          value={formData.mosalAtak}
          onChange={handleChange}
        />

        <InputField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <InputField
          label="Mobile 1"
          name="mobile1"
          value={formData.mobile1}
          onChange={handleChange}
        />

        <InputField
          label="Mobile 2"
          name="mobile2"
          value={formData.mobile2}
          onChange={handleChange}
        />

        <InputField
          label="Whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

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
          border: "1px solid #ddd",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
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

      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          background: "#fff",
          boxSizing: "border-box",
        }}
      >
        <option value="">
          Select {label}
        </option>

        {options.map((item) => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

} 

export default AddFamily;