import { useContext } from "react"
import { IContactData, contactContext } from "../../App"
import { useNavigate } from "react-router-dom"
import { color } from "../../const/color"
import RenderDataContact from "../contact/renderDataContact"

const OnceDetail = () => {
    const contact: any = useContext(contactContext)
    const { currentUser, currentTarget, currentUserId }: { currentUser: IContactData, currentTarget: IContactData, currentUserId: string } = contact ?? {}
    const navigate = useNavigate()
    if (!currentTarget) return null
    return <div style={{ height: '100%', width: '100%' }}>
        <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ borderBottom: '1px solid', marginBottom: '10px', height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{ textAlign: 'left' }}>{currentTarget?.name}</h1>
                <div
                    style={{ fontSize: '20px', backgroundColor: color.primary, padding: '10px', borderRadius: 1000, color: 'white' }}
                    onClick={() => {
                        const data = {
                            name: currentUser.name,
                            room: currentUserId,
                            target: [currentTarget?.tokenNotifications],
                            roomName: `${currentUser.name}, ${currentTarget.name}`,
                            email: currentUser.email
                        }
                        navigate(`/call`, {
                            state: data
                        })
                    }}>
                    Bắt đầu cuộc gọi
                </div>
            </div>
            <div>
                <RenderDataContact data={currentTarget} />
            </div>
        </div>
    </div>
}

export default OnceDetail