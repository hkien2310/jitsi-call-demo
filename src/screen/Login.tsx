import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { contactContext } from '../App'
import { border, color } from '../const/color'
import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth()
    const navigate = useNavigate()
    const context = useContext(contactContext)
    const { setIsLoadingApp } = context as any ?? {}
    const {t} = useTranslation()

    const handleSignIn = () => {
        setIsLoadingApp(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                // console.log('success', user)
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
                window.alert(t('shared:wrongPass'));
            }).finally(() => {
                setIsLoadingApp(false)
            })
            ;

    }
    return <div style={{ position: 'fixed', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column' }}>
        <div style={{ paddingBottom: '10px', fontSize: '35px', textTransform: 'uppercase' }}>
            {t('shared:login')}
        </div>
        <div style={{
            border: border.main, padding: '20px',
            boxShadow: '1px 1px 15px #000000',
            borderRadius: '10px'
        }}>
            {/* <form onSubmit={handleSignIn}> */}
            <Grid container>
                <Grid item xs={4}>
                    <label htmlFor='email' style={{ textAlign: 'left', width: '100%', paddingRight: '10px' }}>{t('shared:email')}:</label>
                </Grid>
                <Grid item xs={8}>
                    <input id='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={4}>
                    <label htmlFor='password' style={{ textAlign: 'left', width: '100%', paddingRight: '10px' }}>{t('shared:password')}:</label>
                </Grid>
                <Grid item xs={8}>
                    <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Grid>
            </Grid>
            <button type="submit" onClick={handleSignIn} style={{borderRadius: '10px', backgroundColor: 'white', border: border.main, fontSize: '20px', marginTop: '20px', padding: '5px'}}>{t('shared:login')}</button>
            {/* </form> */}
        </div>
    </div>
}
export default LoginPage