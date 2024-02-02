import { collection, getDocs, query } from "firebase/firestore";
import { db } from "..";

export const getAllData = async (collectionName: string) => {
    let data: any[] = []
    try {
        const q = await query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        // let allUser: any[] = []
        // console.log('querySnapshot', querySnapshot)
        await querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({
                id: doc.id,
                data: doc.data()
            })
        });
        
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
    return data
};
