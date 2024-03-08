import { useContext, useState } from 'react';
import { IContactData, contactContext } from '../../App';
// import { db } from '../..'
import { Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import 'reactjs-popup/dist/index.css';
import { border, color } from '../../const/color';

const style = {
    button: {
        backgroundColor: color.primary,
        width: '100%',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderRadius: 1000,
        color: 'white'
    }
}

const LeftLayout = (props: any) => {
    const contact: any = useContext(contactContext)
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [openNewGroup, setOpenNewGroup] = useState(false);

    const { currentUser, listContact, tab, setTab }: { currentUser: IContactData, listContact: IContactData[], tab: 0 | 1, setTab: any } = contact ?? {}
    const [selected, setSelected] = useState<any[]>([])
    // const navigate = useNavigate()
    // const auth = getAuth()
    // const onSignOut = () => {
    //     signOut(auth).then(() => {
    //         // Sign-out successful.
    //         console.log('succeess')
    //         navigate('login')
    //     }).catch((error) => {
    //         // An error happened.
    //         console.log('errorrr')
    //     });

    // }
    return <Box style={{ flex: 1 }}>
        <Grid container>
            <Grid item xs={5} style={{ borderRight: border.main, height: '100%' }}>
                <div style={{ padding: '10px' }}>
                    <div>
                        <div style={tab === 0 ? style.button : { ...style.button, backgroundColor: color.secondary }} onClick={() => setTab(0)}>
                            Tin nhắn
                        </div>
                        <div style={tab === 1 ? style.button : { ...style.button, backgroundColor: color.secondary }} onClick={() => setTab(1)}>
                            Group
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    </Box>
}

export default LeftLayout