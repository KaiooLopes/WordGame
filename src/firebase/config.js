import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDhjNUETT-7M1hgnyNWxtTn2nOtALuAuUE",
  authDomain: "leagueoflegendschampions-dba93.firebaseapp.com",
  projectId: "leagueoflegendschampions-dba93",
  storageBucket: "leagueoflegendschampions-dba93.appspot.com",
  messagingSenderId: "354718596956",
  appId: "1:354718596956:web:3e3e5cfd4c3d15432f0b99"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };