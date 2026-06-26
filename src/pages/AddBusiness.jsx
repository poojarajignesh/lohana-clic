import { useState } from "react";
import { categories } from "../data/categories";
import { db } from "../firebase/config";
import { getLoggedFamily } from "../auth/Auth";
import {
addDoc,
collection,
} from "firebase/firestore";

function AddBusiness() {
const loggedFamily = getLoggedFamily();

const [formData, setFormData] =
useState({
ownerName: "",
businessName: "",
category: "",
subCategory: "",
city: "",
address: "",
mobile: "",
whatsapp: "",
email: "",
website: "",
description: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]:
e.target.value,
});
};

const handleCategoryChange = (
e
) => {
setFormData({
...formData,
category: e.target.value,
subCategory: "",
});
};

const handleSubmit = async (
e
) => {
e.preventDefault();


try {
  await addDoc(
  collection(db, "businesses"),
  {
    ...formData,

    ownerFamilyId:
      loggedFamily?.familyId || "",

    ownerHeadName:
      loggedFamily?.headName || "",

    ownerMobile:
      loggedFamily?.mobile1 || "",

    ownerCity:
      loggedFamily?.city ||
      loggedFamily?.village ||
      "",

    status: "Pending",

    createdAt: new Date(),
  }
);

  alert(
    "Business Added Successfully"
  );

  setFormData({
    ownerName: "",
    businessName: "",
    category: "",
    subCategory: "",
    city: "",
    address: "",
    mobile: "",
    whatsapp: "",
    email: "",
    website: "",
    description: "",
  });
} catch (error) {
  console.error(error);

  alert(
    "Error Adding Business"
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
<h2
style={{
color: "#1E88E5",
marginBottom:
"20px",
}}
>
Add Business </h2>

```
  <form
    onSubmit={
      handleSubmit
    }
  >
    <input
      type="text"
      name="ownerName"
      placeholder="Owner Name"
      value={
        formData.ownerName
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    />

    <input
      type="text"
      name="businessName"
      placeholder="Business Name"
      value={
        formData.businessName
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    />

    <select
      name="category"
      value={
        formData.category
      }
      onChange={
        handleCategoryChange
      }
      style={
        inputStyle
      }
    >
      <option value="">
        Select Main Category
      </option>

      {Object.keys(
        categories
      ).map(
        (
          category
        ) => (
          <option
            key={
              category
            }
            value={
              category
            }
          >
            {
              category
            }
          </option>
        )
      )}
    </select>

    <select
      name="subCategory"
      value={
        formData.subCategory
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    >
      <option value="">
        Select Sub Category
      </option>

      {(
        categories[
          formData
            .category
        ] || []
      ).map(
        (
          subCategory
        ) => (
          <option
            key={
              subCategory
            }
            value={
              subCategory
            }
          >
            {
              subCategory
            }
          </option>
        )
      )}
    </select>

    <input
      type="text"
      name="city"
      placeholder="City"
      value={
        formData.city
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    />

    <input
      type="text"
      name="address"
      placeholder="Business Address"
      value={
        formData.address
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    />

    <input
      type="text"
      name="mobile"
      placeholder="Mobile Number"
      value={
        formData.mobile
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    />

    <input
      type="text"
      name="whatsapp"
      placeholder="WhatsApp Number"
      value={
        formData.whatsapp
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    />

    <input
      type="email"
      name="email"
      placeholder="Email"
      value={
        formData.email
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    />

    <input
      type="text"
      name="website"
      placeholder="Website"
      value={
        formData.website
      }
      onChange={
        handleChange
      }
      style={
        inputStyle
      }
    />

    <textarea
      name="description"
      placeholder="Business Description"
      value={
        formData.description
      }
      onChange={
        handleChange
      }
      style={{
        ...inputStyle,
        height:
          "120px",
        resize:
          "none",
      }}
    />

    <button
      type="submit"
      style={{
        width: "100%",
        padding:
          "15px",
        border: "none",
        borderRadius:
          "16px",
        background:
          "linear-gradient(135deg,#FF6B00,#FF8C42)",
        color:
          "#fff",
        fontWeight:
          "700",
        cursor:
          "pointer",
        fontSize:
          "16px",
      }}
    >
      Submit Business
    </button>
  </form>
</div>


);
}

const inputStyle = {
width: "100%",
padding: "14px",
marginBottom: "15px",
borderRadius: "14px",
border:
"1px solid #ddd",
outline: "none",
fontSize: "14px",
boxSizing:
"border-box",
};

export default AddBusiness;
