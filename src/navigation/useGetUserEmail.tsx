import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const useGetUserEmail = () => {
    const auth = getAuth()
    const [emailUser, setEmailUser] = useState<string | null>()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setEmailUser(user.email)
            } 
        })
    })
    return {emailUser}
}

export default useGetUserEmail