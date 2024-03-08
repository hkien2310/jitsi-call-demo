import { useContext } from "react"
import { IContactData, IGroupData, contactContext } from "../../App"
import { useNavigate } from "react-router-dom"
import { border, color } from "../../const/color"
import RenderDataContact from "../contact/renderDataContact"
import { useTranslation } from "react-i18next"

const GroupDetail = () => {
    const contact: any = useContext(contactContext)
    const { currentUser, currentTargetGroup, currentUserId }: { currentUser: IContactData, currentTargetGroup: IGroupData, currentUserId: string } = contact ?? {}
    const navigate = useNavigate()
    const {t} = useTranslation()


    if (!currentTargetGroup) return null
    return <div style={{ height: '100vh', width: '100%' }}>
        <div style={{ display: 'flex', width: '100%', flexDirection: 'column', height: '100%',  }}>
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
                        {t('shared:startCall')}
                    </span>
                </div>
            </div>
            <div style={{overflow: 'scroll', flexDirection: 'column'}}>
                <div style={{ fontSize: '25px' }}>
                    {t('shared:listMember')}
                </div>
                <div style={{flex: 1}}>
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