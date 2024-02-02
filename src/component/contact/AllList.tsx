import React, { useContext, useState } from 'react'
import { IContactData, contactContext } from '../../App'
import ContactList from './contactList'
import GroupList from './groupList'
import { color } from '../../const/color'

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

const AllList = () => {
    const contact: any = useContext(contactContext)
    // const [tab, setTab] = useState(0)
    const { tab, setTab } = contact ?? {}

    return <div style={{width: '100%'}}>
            {tab === 0 ? <ContactList /> : <GroupList />}
    </div>
}
export default AllList