import { useState, useEffect } from "react";
import { db } from "../firebase/config"
import { collection, query,  getDocs} from "firebase/firestore";

export const useFetchDocument = (docCollection, data) => {

    const [ documents, setDocuments ] = useState(null);
    const [ error, setError ] = useState(null)
    const [ loading, setLoading ] = useState(null)

    //deal with memory leak
    const [ cancelled, setCancelled ] = useState(false);
    
    useEffect(() => {
        if(data){
            setCancelled(false)
        }

        async function loadData(){
            if(cancelled) return;

            setLoading(true)

            const collectionRef = await collection(db, docCollection)
            
            try {

                const q = query(collectionRef)

                const querySnapshot = await getDocs(q);
                
                const arrDocs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                let randomNumber = parseInt(Math.random() * arrDocs.length)

                setDocuments(arrDocs[randomNumber]);

                setLoading(false);
                
            } catch (error) {
                setError(error);
                console.log(error.message);
                setLoading(false);
            }
        }
        
        loadData();
    }, [docCollection, data ,cancelled]);

    useEffect(() => {
        return () => setCancelled(true)
    }, []);

    return {documents, loading, error}
}