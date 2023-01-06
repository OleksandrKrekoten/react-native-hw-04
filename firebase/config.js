import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0WUB0UjF1t2_v4mMG67zKg9Z3eIWh_HY",
  authDomain: "rn-social-cfd58.firebaseapp.com",
  projectId: "rn-social-cfd58",
  storageBucket: "rn-social-cfd58.appspot.com",
  messagingSenderId: "23747053941",
  appId: "1:23747053941:web:7ce7a35c7199aa19576b3c",
  measurementId: "G-MK4N8C7W16",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app, "gs://rn-social-cfd58.appspot.com");
export const db = getFirestore(app);