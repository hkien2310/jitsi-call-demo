import { useNavigate } from 'react-router-dom';

import { useContext } from "react";

import { IContactData, contactContext } from '../App';
import MainLayout from '../component/layout/mainLayout';
import OnceDetail from '../component/meeting/Once';
import GroupDetail from '../component/meeting/Group';

const Home = () => {
    const navigate = useNavigate();
    // const contact = useContext(contactContext);
    const contact: any = useContext(contactContext)
    const { currentUser, currentTarget, currentUserId, tab }: { currentUser: IContactData, currentTarget: IContactData, currentUserId: string, tab: 0 | 1 } = contact ?? {}

    return <MainLayout>
        <div style={{display: 'flex', flex: 1, paddingLeft: '10px', paddingRight: '10px'}}>
            {tab === 0 ? <OnceDetail /> : <GroupDetail />}
        </div>
    </MainLayout>
}

export default Home