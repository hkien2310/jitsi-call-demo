import { useContext } from "react"
import { IContactData, contactContext } from "../../App"
import { useNavigate } from "react-router-dom"
import { color } from "../../const/color"
import RenderDataContact from "../contact/renderDataContact"
import { IParamsCall } from "../../screen/Jitsi"
import { IPropsCallNotiResponseBody } from "../../Notification"
import { sendNotification } from "../../helper/sendNotification"
import { useTranslation } from "react-i18next"

const OnceDetail = () => {
    const contact: any = useContext(contactContext)
    const { currentUser, currentTarget, currentUserId }: { currentUser: IContactData, currentTarget: IContactData, currentUserId: string } = contact ?? {}
    const navigate = useNavigate()
    const {t} = useTranslation()
    if (!currentTarget) return null
    return <div style={{ height: '100%', width: '100%' }}>
        <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>


        <div style={{ borderBottom: '1px solid', marginBottom: '10px', height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ textAlign: 'left' }}>{currentTarget?.name}</h1>
            <div
                style={{ fontSize: '20px', backgroundColor: color.primary, padding: '10px', borderRadius: 1000, color: 'white' }}
                onClick={() => {
                    const data: IParamsCall = {
                        name: currentUser.name,
                        room: currentUserId,
                        target: [currentTarget?.tokenNotifications || ''],
                        roomName: `${currentUser.name}`,
                        email: currentUser.email
                    }
                    // const body: IPropsCallNotiResponseBody = {
                    //     groupName: data.roomName,
                    //     room: params.room,
                    //     userSender: currentUser,
                    // }
                    // sendNotification(currentTarget?.tokenNotifications || '', {
                    //     groupName: data.roomName,
                    //     room: currentUserId,
                    //     userSender: currentUser,
                    // });
                    navigate(`/call`, {
                        state: data
                    })
                }}>
                {t('shared:startCall')}
            </div>
        </div>
        <div>
            <RenderDataContact data={currentTarget} />
        </div>
    </div>
    </div >
}

export default OnceDetail