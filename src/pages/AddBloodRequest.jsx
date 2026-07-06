import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase/config";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function AddBloodRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] =
    useState({
      patientName: "",
      bloodGroup: "",
      hospital: "",
      city: "",
      contactPerson: "",
      mobile: "",
      units: "",
      requirementDate: "",
      remarks: "",
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
            "bloodRequests"
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
          "Blood Request Submitted Successfully"
        );
navigate("/blood");
        setFormData({
          patientName: "",
          bloodGroup: "",
          hospital: "",
          city: "",
          contactPerson: "",
          mobile: "",
          units: "",
          requirementDate: "",
          remarks: "",
        });
      } catch (error) {
        console.log(error);

        alert(
          "Error Saving Request"
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
          color: "#DC2626",
          marginBottom:
            "20px",
        }}
      >
        Emergency Blood Request
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <InputField
          label="Patient Name"
          name="patientName"
          value={
            formData.patientName
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
            Blood Group
          </label>

          <select
            name="bloodGroup"
            value={
              formData.bloodGroup
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
          >
            <option value="">
              Select Blood Group
            </option>

            <option>
              A+
            </option>
            <option>
              A-
            </option>
            <option>
              B+
            </option>
            <option>
              B-
            </option>
            <option>
              AB+
            </option>
            <option>
              AB-
            </option>
            <option>
              O+
            </option>
            <option>
              O-
            </option>
          </select>
        </div>

        <InputField
          label="Hospital"
          name="hospital"
          value={
            formData.hospital
          }
          onChange={
            handleChange
          }
        />

        <InputField
          label="City"
          name="city"
          value={
            formData.city
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
          label="Units Required"
          name="units"
          value={
            formData.units
          }
          onChange={
            handleChange
          }
        />

        <div
  style={{
    marginBottom:"15px",
  }}
>
<label
style={{
display:"block",
fontWeight:"600",
marginBottom:"6px",
}}
>
Required Date
</label>

<input
type="date"
name="requirementDate"
value={formData.requirementDate}
onChange={handleChange}
style={{
width:"100%",
padding:"12px",
borderRadius:"12px",
border:"1px solid #ddd",
}}
/>

</div>

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
            Remarks
          </label>

          <textarea
            name="remarks"
            value={
              formData.remarks
            }
            onChange={
              handleChange
            }
            rows="4"
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
              "#DC2626",
            color:
              "#fff",
            fontWeight:
              "700",
            cursor:
              "pointer",
          }}
        >
          Submit Request
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

export default AddBloodRequest;