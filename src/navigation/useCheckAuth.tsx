import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useCheckAuth = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const [emailUser, setEmailUser] = useState<string | null>()
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                // window.
                navigate('login')
            } else {
                setEmailUser(user.email)
            }
        })

    }, [auth, navigate])
    return emailUser
}

export default useCheckAuth