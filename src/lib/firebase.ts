import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, query, where, limit } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json" with { type: "json" };

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with custom database ID if specified
export const db = getFirestore(
  app,
  firebaseConfig.firestoreDatabaseId || "(default)"
);

export { collection, getDocs, addDoc, doc, setDoc, query, where, limit };
