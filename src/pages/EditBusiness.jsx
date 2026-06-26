import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { db } from "../firebase/config";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

function EditBusiness() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

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

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness =
    async () => {
      try {
        const docRef = doc(
          db,
          "businesses",
          id
        );

        const docSnap =
          await getDoc(docRef);

        if (docSnap.exists()) {
          setFormData(
            docSnap.data()
          );
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleUpdate =
    async (e) => {
      e.preventDefault();

      try {
        await updateDoc(
          doc(
            db,
            "businesses",
            id
          ),
          {
            ...formData,
          }
        );

        alert(
          "Business Updated Successfully"
        );

        navigate(
          `/business/${id}`
        );
      } catch (error) {
        console.log(error);

        alert(
          "Update Failed"
        );
      }
    };

  if (loading)
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2>
        Edit Business
      </h2>

      <form
        onSubmit={
          handleUpdate
        }
      >
        {[
          [
            "ownerName",
            "Owner Name",
          ],
          [
            "businessName",
            "Business Name",
          ],
          [
            "category",
            "Category",
          ],
          [
            "subCategory",
            "Sub Category",
          ],
          [
            "city",
            "City",
          ],
          [
            "address",
            "Address",
          ],
          [
            "mobile",
            "Mobile",
          ],
          [
            "whatsapp",
            "WhatsApp",
          ],
          [
            "email",
            "Email",
          ],
          [
            "website",
            "Website",
          ],
        ].map(
          ([key, label]) => (
            <input
              key={key}
              type="text"
              name={key}
              placeholder={
                label
              }
              value={
                formData[
                  key
                ] || ""
              }
              onChange={
                handleChange
              }
              style={
                inputStyle
              }
            />
          )
        )}

        <textarea
          name="description"
          placeholder="Description"
          value={
            formData.description ||
            ""
          }
          onChange={
            handleChange
          }
          style={{
            ...inputStyle,
            height:
              "120px",
          }}
        />

        <button
          type="submit"
          style={
            buttonStyle
          }
        >
          Update Business
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
  boxSizing:
    "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "14px",
  background:
    "#2563EB",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

export default EditBusiness;