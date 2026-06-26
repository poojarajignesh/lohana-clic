import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
apiKey: "AIzaSyCTmYuxSYt6pHMg1Is8y96oYjXPuO5wkjo",
authDomain: "lohana-clic-7bba3.firebaseapp.com",
projectId: "lohana-clic-7bba3",
storageBucket: "lohana-clic-7bba3.firebasestorage.app",
messagingSenderId: "405275686810",
appId: "1:405275686810:web:28673779e8313598b6ac23",
measurementId: "G-M4G6Y5DP9V",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage =
getStorage(app);
