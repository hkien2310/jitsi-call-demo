import { addDoc, collection } from "firebase/firestore";
import { db } from "..";

export const createDataCollections = async (collectionName: string, dataToAdd: any) => {
    try {
      // Example data to be added
      // Add data to the Firestore collection
      const docRef = await addDoc(collection(db, collectionName), dataToAdd);
      console.log('Document added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
