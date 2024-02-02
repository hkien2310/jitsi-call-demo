import { useContext, useState } from "react"
import { IContactData, IGroupData, contactContext } from "../../App"
import { createDataCollections } from "../../helper/createDataCollections"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../.."
import { border, color } from "../../const/color"

interface IProps {
    onClose: () => void
}
const PopupCreateNewGroup = (props: IProps) => {
    const { onClose } = props
    const contact: any = useContext(contactContext)
    const { listContact, setListGroup, currentUser, setIsLoadingApp }: { listContact: IContactData[], setListGroup: any, currentUser: IContactData, setIsLoadingApp: any } = contact ?? {}
    const [tempGroup, setTempGroup,] = useState<IContactData[]>([])

    const refetchDataGroup = async () => {

        const q = query(collection(db, "group"));
        const getDocument = async (query: any) => {
            const data: IGroupData[] = []
            const querySnapshot = await getDocs(query);
            await querySnapshot.forEach((doc) => {
                console.log(doc.data(), 'doc.data()')
                const docId = doc.id
                const docParsed = doc.data() as any
                const groupName = docParsed?.groupName
                const dataItem = docParsed?.data
                const isUser = dataItem?.some((e: IContactData) => `${e?.email}` === `${currentUser?.email}`)
                // doc.data() is never undefined for query doc snapshots
                if (isUser) {
                    const dataToPush: IGroupData = {
                        data: dataItem,
                        groupId: docId,
                        groupName: groupName
                    }
                    data.push(dataToPush)
                }
            });
            setListGroup(data)
        }
        await getDocument(q).finally(() => {
            setIsLoadingApp(false)

        })
    }
    return <div style={{ width: '50vw', padding: '20px', backgroundColor: 'white', boxShadow: '1px 2px 9px #808080', borderRadius: '10px' }}>
        <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '25px', textTransform: 'uppercase' }}>
            Chọn thành viên
        </div>
        {[...listContact]?.map((e) => {
            const isSelected = tempGroup?.some((el) => el?.id === e?.id)
            return <div
                onClick={() => setTempGroup((prev) => {
                    const isValid = prev?.find((elm) => elm?.id === e?.id)
                    if (isValid) {
                        return prev.filter((elm) => elm?.id !== e?.id)
                    } else {
                        return [...prev, e]
                    }
                })}
                style={{
                    textAlign: 'left',
                    padding: '10px',
                    backgroundColor: isSelected ? color.mainColor : 'white',
                    borderBottom: border.main,
                    borderRadius: '10px',
                }}
                key={e?.id}
            >{e?.name}</div>
        })}
        <div style={{
            backgroundColor: color.active,
            padding: '10px',
            textAlign: 'center',
            color: 'white',
            marginTop: '20px',
            borderRadius: '10px',
        }} onClick={async () => {
            setIsLoadingApp(true)
            setTempGroup([])
            onClose()
            const dataToCreate = {
                groupName: [currentUser, ...tempGroup]?.map((e) => e?.name)?.join(', '),
                data: [currentUser, ...tempGroup],
            }
            await createDataCollections('group', dataToCreate).finally(() => refetchDataGroup())
        }}>
            Create
        </div>
    </div>
}
export default PopupCreateNewGroup