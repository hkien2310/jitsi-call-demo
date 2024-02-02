import { useContext } from "react"
import { IContactData, IGroupData, contactContext } from "../../App"
import { useNavigate } from "react-router-dom"
import { border, color } from "../../const/color"
import RenderDataContact from "../contact/renderDataContact"

const GroupDetail = () => {
    const contact: any = useContext(contactContext)
    const { currentUser, currentTargetGroup, currentUserId }: { currentUser: IContactData, currentTargetGroup: IGroupData, currentUserId: string } = contact ?? {}
    const navigate = useNavigate()


    if (!currentTargetGroup) return null
    return <div style={{ height: '100%', width: '100%' }}>
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column', height: '100%' }}>
            <div id={'top-detail'} style={{ marginLeft: '10px', marginRight: '10px', borderBottom: '1px solid', marginBottom: '10px', height: '10%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    flex: 1,
                }}>{currentTargetGroup?.groupName}</h1>
                <div
                    style={{
                        // flexWrap: 'nowrap',
                        fontSize: '20px',
                        backgroundColor: color.primary,
                        padding: '10px',
                        borderRadius: 1000,
                        color: 'white',

                    }}
                    onClick={() => {
                        navigate(`/call`, {
                            state: {
                                name: currentUser.name,
                                roomName: currentTargetGroup.groupName,
                                email: currentUser.email,
                                room: currentTargetGroup.groupId,
                                target: currentTargetGroup?.data?.map((e) => e?.tokenNotifications)
                            }
                        })
                    }}
                >
                    <span>
                        Bắt đầu cuộc gọi
                    </span>
                </div>
            </div>
            <div style={{overflow: 'scroll', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: '25px' }}>
                    Thông tin thành viên
                </div>
                <div style={{flex: 1 }}>
                    {currentTargetGroup?.data?.map((e, index) => {
                        return <div key={index} style={{ borderBottom: border.main, paddingTop: '10px' }}>
                            <div style={{ textAlign: 'left', paddingLeft: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
                                {e?.name}
                            </div>
                            <RenderDataContact data={e} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
}

export default GroupDetail