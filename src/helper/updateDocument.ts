import { doc, updateDoc } from "firebase/firestore";
import { db } from "..";

export const updateDocument = async (collectionName: string, idUpdate: string, dataUpdate: any) => {
    const docRef = doc(db, collectionName, idUpdate);
    updateDoc(docRef, dataUpdate);
}