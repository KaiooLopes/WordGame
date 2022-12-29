import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, getDocs } from "firebase/firestore";

export const useFetchDocument = (docCollection, data) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (data) {
        setCancelled(false);
      }
      if (cancelled) return;
      console.log("oi");

      setLoading(true);

      const collectionRef = await collection(db, docCollection);

      try {
        const q = query(collectionRef);

        const querySnapshot = await getDocs(q);

        const arrDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let randomNumber = parseInt(Math.random() * arrDocs.length);

        setDocuments(arrDocs[randomNumber]);

        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollection, data, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
