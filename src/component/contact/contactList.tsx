import React, { useContext } from 'react'
import { IContactData, IGroupData, contactContext } from '../../App'
import { border, color } from '../../const/color'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ContactList = () => {
    const contact: any = useContext(contactContext)
    const { listContact, currentTarget, setCurrentTarget, setActiveSection, activeSection }: { activeSection: 1 | 2 | 3, listContact: IContactData[], currentTarget: IContactData, setCurrentTarget: any, setActiveSection: any } = contact ?? {}
    return <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* <div style={{fontSize: '25px', borderBottom: border.main, marginBottom: '10px' }}>
            Danh sách cuộc gọi đơn
        </div> */}
        {[...listContact]?.map((e) => {
            return <div
                onClick={() => {
                    // console.log(e, 'eee')
                    setCurrentTarget(e)
                    setActiveSection(2)
                }}
                style={{
                    borderBottom: border.main,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'left',
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: currentTarget?.id === e?.id ? (activeSection === 2 ? color.active : color.selected) : 'white',
                    color: currentTarget?.id === e?.id ? (activeSection === 2 ? 'white' : 'black') : 'black',
                }}
                key={e?.id}
            >
                <div>
                    {e?.name}
                </div>
                <div>
                    {
                        e?.avatar ?
                            <img alt={''} src={e?.avatar} style={{ width: '30px', height: '30px', borderRadius: 1000 }} />
                            :
                            <AccountCircleIcon />
                    }
                </div>
            </div>
        })}
    </div>
}
export default ContactList