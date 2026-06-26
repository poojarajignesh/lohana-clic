import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import {
  collection,
  getDocs,
} from "firebase/firestore";

function AdvertisementSlider() {
  const [ads, setAds] =
    useState([]);

  const [current, setCurrent] =
    useState(0);

  useEffect(() => {
    loadAds();
  }, []);

  useEffect(() => {
    if (ads.length === 0)
      return;

    const timer =
      setInterval(() => {
        setCurrent(
          (prev) =>
            (prev + 1) %
            ads.length
        );
      }, 3000);

    return () =>
      clearInterval(timer);
  }, [ads]);

  const loadAds =
    async () => {
      try {
        const snapshot =
          await getDocs(
            collection(
              db,
              "advertisements"
            )
          );

        const list =
          snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .filter(
              (ad) =>
                ad.status ===
                "Approved"
            );

        setAds(list);
      } catch (error) {
        console.log(error);
      }
    };

  if (ads.length === 0)
    return null;

  const ad =
    ads[current];

  return (
    <a
      href={ad.link}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block",
        marginBottom:
          "20px",
      }}
    >
      <img
        src={ad.imageUrl}
        alt={ad.title}
        style={{
          width: "100%",
          borderRadius:
            "20px",
          height: "160px",
          objectFit:
            "cover",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.08)",
        }}
      />
    </a>
  );
}

export default AdvertisementSlider;