import { Box, Button, Grid, Popover, Select, Typography } from '@mui/material'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { IContactData, contactContext } from '../../App'
import { border, color } from '../../const/color'
import ShowCallNotification from '../call/ShowCallNotification'
import AllList from '../contact/AllList'
import { useTranslation } from 'react-i18next'
import { changeLang } from '../../helper/lang'

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
    const { t } = useTranslation()
    const contact: any = useContext(contactContext)
    const { currentUser, tab, setTab, setActiveSection, activeSection, showCallNoti }: { showCallNoti: boolean, currentUser: IContactData, tab: 0 | 1, setTab: any, setActiveSection: any, activeSection: 1 | 2 | 3 } = contact ?? {}
    const navigate = useNavigate()
    const auth = getAuth()
    const [signOutPopup, setSignOutPopup] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
        <ShowCallNotification showNoti={showCallNoti} />

        <Box style={{ backgroundColor: color.background.main, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '50px', borderBottom: border.main }}>
            <Box style={{ padding: '10px', textTransform: 'capitalize' }}>
                {t('shared:demo')}
            </Box>

            <Box style={{display: 'flex', flexDirection: 'row'}}>
                <Button aria-describedby={id} onClick={handleClick}>
                    {t('shared:changeLang')}
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography onClick={() => changeLang('vi')} sx={{ p: 2, ":hover": {backgroundColor: 'gray', color: 'white'} }}>{t('shared:vi')}</Typography>
                    <Typography onClick={() => changeLang('en')} sx={{ p: 2, ":hover": {backgroundColor: 'gray', color: 'white'} }}>{t('shared:en')}</Typography>
                    <Typography onClick={() => changeLang('jp')} sx={{ p: 2, ":hover": {backgroundColor: 'gray', color: 'white'} }}>{t('shared:jp')}</Typography>
                </Popover>
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
                        {t('shared:logout')}
                    </div>
                </Popup>
                <Box style={{ padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }} onClick={() => setSignOutPopup(true)}>
                    <img alt={'avatar'} src={currentUser?.avatar} style={{ width: '40px', height: '40px', borderRadius: 1000 }} />
                    {currentUser?.name}
                </Box>
            </Box>
        </Box>

        <Box style={{ flex: 1 }}>
            <Grid container style={{ flex: 1 }}>
                <Grid item xs={3} style={{ display: 'flex', flex: 1, borderRight: border.main, backgroundColor: color.leftViewColor }}>
                    <div style={{ padding: '10px', width: '100%' }}>
                        <div style={{ textAlign: 'left', textTransform: 'uppercase', fontWeight: 500, borderBottom: border.main, marginBottom: '10px', fontSize: '25px' }}>
                            {t('shared:list')}
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
                                {t('shared:message')}
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
                                {t('shared:group')}
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
                <Grid item xs={6} style={{ height: window.innerHeight - 51, overflow: 'hidden' }}>
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
//     </Grid> */}

export default MainLayout