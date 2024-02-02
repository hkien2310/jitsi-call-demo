import { Box, Grid } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { IContactData, contactContext } from '../../App'
import { border, color } from '../../const/color'
import LeftLayout from './leftLayout'
import AllList from '../contact/AllList'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'

const style = {
    button: {
        width: '100%',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderRadius: '10px',
        color: 'black'
    }
}

const MainLayout = (props?: any) => {
    const { children } = props ?? {}
    const contact: any = useContext(contactContext)
    const { currentUser, tab, setTab, setActiveSection, activeSection }: { currentUser: IContactData, tab: 0 | 1, setTab: any, setActiveSection: any, activeSection: 1 | 2 | 3 } = contact ?? {}
    const navigate = useNavigate()
    const auth = getAuth()
    const [signOutPopup, setSignOutPopup] = useState(false)

    const onSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('succeess')
            navigate('/login')
        }).catch((error) => {
            // An error happened.
            console.log('errorrr')
        });

    }

    // useEffect(() => {
    //     // console.log(user, 'useruser')
    //     onAuthStateChanged(auth, (user) => {
    //         // console.log('userssss', user)
    //         if (!user) {
    //             // Người dùng đã đăng nhập, gọi hàm cập nhật token FCM
    //             // updateFCMToken(user);
    //             navigate('/login')
    //         }

    //     });
    // }, [auth, navigate])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                // Người dùng đã đăng nhập
            } else {
                // Người dùng chưa đăng nhập
                // Redirect tới trang đăng nhập hoặc trang khác
                // Ví dụ: history.push('/login');
                navigate('/login')
            }
        });

        // Cleanup function để unsubscribe khi component bị unmounted
        return () => unsubscribe();
    }, [auth, navigate]);

    return <Box style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box style={{ backgroundColor: color.background.main, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '50px', borderBottom: border.main }}>
            <Box style={{ padding: '10px', textTransform: 'capitalize' }}>
                Jitsi Demo Call
            </Box>
            <Popup open={signOutPopup} modal={true} onClose={() => setSignOutPopup(false)} overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <div
                    style={{
                        padding: '20px',
                        width: '20vw',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        boxShadow: '1px 1px 15px #000000',
                        borderRadius: '10px',
                    }}
                    onClick={() => {
                        onSignOut()
                    }}>
                    Đăng xuất
                </div>
            </Popup>
            <Box style={{ padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }} onClick={() => setSignOutPopup(true)}>
                <img alt={'avatar'} src={currentUser?.avatar} style={{ width: '40px', height: '40px', borderRadius: 1000 }} />
                {currentUser?.name}
            </Box>
        </Box>

        <Box style={{ flex: 1 }}>
            <Grid container style={{ flex: 1 }}>
                <Grid item xs={3} style={{ display: 'flex', flex: 1, borderRight: border.main, backgroundColor: color.leftViewColor }}>
                    <div style={{ padding: '10px', width: '100%' }}>
                        <div style={{ textAlign: 'left', textTransform: 'uppercase', fontWeight: 500, borderBottom: border.main, marginBottom: '10px', fontSize: '25px' }}>
                            Danh sách
                        </div>
                        <div>
                            <div
                                style={
                                    tab !== 0 ?
                                        style.button
                                        :
                                        {
                                            ...style.button,
                                            backgroundColor:
                                                activeSection === 1
                                                    ?
                                                    color.active
                                                    :
                                                    color.selected,
                                            color:
                                                activeSection === 1
                                                    ?
                                                    'white'
                                                    :
                                                    'black'
                                        }
                                }
                                onClick={() => {
                                    setActiveSection(1)
                                    setTab(0)
                                }}
                            >
                                Tin nhắn
                            </div>
                            <div style={
                                tab !== 1 ?
                                    style.button
                                    :
                                    {
                                        ...style.button,
                                        backgroundColor:
                                            activeSection === 1
                                                ?
                                                color.active
                                                :
                                                color.selected,
                                        color:
                                            activeSection === 1
                                                ?
                                                'white'
                                                :
                                                'black'
                                    }
                            }
                                onClick={() => {
                                    setActiveSection(1)
                                    setTab(1)
                                }}>
                                Group
                            </div>
                        </div>
                    </div>
                    {/* <LeftLayout>
                        <AllList />
                    </LeftLayout> */}
                </Grid>
                <Grid item xs={3} style={{ display: 'flex', flex: 1, borderRight: border.main }}>
                    <AllList />
                </Grid>
                <Grid item xs={6} style={{ height: window.innerHeight - 50 }}>
                    {children}
                </Grid>
            </Grid>
        </Box>
    </Box>
}
// {/* <Grid container>
//         <Grid item md={4} xs={12}>
//             <LeftLayout>
//                 <AllList />
//             </LeftLayout>
//         </Grid>
//         <Grid item md={8} xs={12}>
//             {children}
//         </Grid>
//     </Grid>
//     <ShowCallNotification showNoti={showCallNoti} /> */}

export default MainLayout