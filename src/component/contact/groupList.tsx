import React, { useContext, useState } from 'react'
import { IContactData, IGroupData, contactContext } from '../../App'
import { border, color } from '../../const/color'
import Popup from 'reactjs-popup'
import PopupCreateNewGroup from './PopupCreateNewGroup'
import AddIcon from '@mui/icons-material/Add';

const GroupList = () => {
    const contact: any = useContext(contactContext)
    const [openNewGroup, setOpenNewGroup] = useState(false);
    const { listGroup, currentTargetGroup, setCurrentTargetGroup, activeSection, setActiveSection }: { setActiveSection: any, listGroup: IGroupData[], currentTargetGroup: IGroupData, setCurrentTargetGroup: any, activeSection: 1 | 2 | 3 } = contact ?? {}
    return <div style={{ padding: '10px', flex: 1 }}>
        {/* <div style={{ fontSize: '18px', borderBottom: '1px solid', marginBottom: '10px'  }}>
            Danh sách cuộc gọi nhóm
        </div> */}
        <div style={{ justifyContent: 'flex-end', display: 'flex' }} onClick={() => setOpenNewGroup(true)}>
            <AddIcon style={{ fontSize: '40px', color: color.active }} />
        </div>
        <Popup open={openNewGroup} modal={true} onClose={() => setOpenNewGroup(false)}>
            <div onClick={() => {
            }}>
                <PopupCreateNewGroup onClose={() => setOpenNewGroup(false)} />
                {/* <ChangeCurrentUserPopup onClose={() => setPopupOpen(false)} /> */}
            </div>
        </Popup>
        <div style={{ flex: 1, backgroundColor: 'red' }}>
            {[...listGroup]?.map((e) => {
                return <div
                    onClick={() => {
                        // console.log(e, 'eee')
                        setCurrentTargetGroup(e)
                        setActiveSection(2)
                    }}
                    style={{
                        borderBottom: border.main,
                        textAlign: 'left',
                        padding: '10px',
                        borderRadius: '10px',
                        backgroundColor: currentTargetGroup?.groupId === e?.groupId ? (activeSection === 2 ? color.active : color.selected) : 'white',
                        color: currentTargetGroup?.groupId === e?.groupId ? (activeSection === 2 ? 'white' : 'black') : 'black',
                    }}
                    key={e?.groupId}
                >{e?.groupName}</div>
            })}
        </div>
    </div>
    // <div style={{ padding: '10px' }}>
    //     {[...listGroup]?.map((e, index) => {
    //         return <div
    //             onClick={() => {
    //                 // console.log(e, 'eee')
    //                 setCurrentTargetGroup(e)
    //             }}
    //             style={{
    //                 textAlign: 'left',
    //                 paddingTop: '10px',
    //                 paddingBottom: '10px',
    //                 backgroundColor: currentTargetGroup?.groupId === e?.groupId ? '#7496ad' : 'white'
    //             }}
    //             key={e?.groupId}
    //         >{e?.groupName}</div>
    //     })}
    // </div>
}
export default GroupList