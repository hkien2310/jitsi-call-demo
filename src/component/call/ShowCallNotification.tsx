import React, { useContext } from 'react'
import { IContactData, contactContext } from '../../App'
import { IPropsCallNotiResponseBody } from '../../Notification'
import { useNavigate } from 'react-router-dom'
import { color } from '../../const/color'

interface IProps {
    showNoti: boolean
}

const ShowCallNotification = (props: IProps) => {
    const { showNoti = false } = props ?? {}
    const contact: any = useContext(contactContext)
    const navigate = useNavigate()
    const { dataCallNoti, currentUser, setShowCallNotification }: { dataCallNoti: IPropsCallNotiResponseBody, currentUser: IContactData, setShowCallNotification: any } = contact
    if (!showNoti) return null
    return <div
        style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={(e) => {
            e?.preventDefault()
            setShowCallNotification(false)
        }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                width: '25%',
            }}>
                <div style={{fontSize: '25px', fontWeight: 600}}>
                    {dataCallNoti?.userSender}
                </div>

                <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
                    {`${dataCallNoti?.userSender} đang mời bạn tham gia cuộc gọi ${dataCallNoti?.groupName}`}
                </div>

                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{flex: 1, backgroundColor: color.secondary, padding: '15px', borderRadius: '10px'}} onClick={() => setShowCallNotification(false)}>
                        Để sau
                    </div>
                    <div style={{width: '20px'}}/>
                    <div style={{flex: 1, backgroundColor: color.primary, padding: '15px', borderRadius: '10px'}} onClick={() => {
                        const body = {
                            name: currentUser.name,
                            room: dataCallNoti?.room,
                            roomName: dataCallNoti?.groupName,
                            email: currentUser?.email,
                        }
                        navigate(`/call`, {
                            state: body
                        })
                        setShowCallNotification(false)
                    }}>
                        Trả lời
                    </div>
                </div>

            </div>

        </div>
    </div >
}

export default ShowCallNotification