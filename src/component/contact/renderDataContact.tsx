import { useTranslation } from "react-i18next";
import { IContactData } from "../../App"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface IProps {
    data: IContactData
}

const style: any = {
    containerItemLine: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
    }
}
const RenderDataContact = (props: IProps) => {
    const { data } = props ?? {}
    const {t} = useTranslation()
    return <>
        <div style={style.containerItemLine}>
            <div>
                {t('shared:email')}:
            </div>
            <div>
                {data?.email}
            </div>
        </div>

        <div style={style.containerItemLine}>
            <div>
            {t('shared:avatar')}:
            </div>
            <div>
                {
                    data?.avatar ? <img src={data?.avatar} alt={''} style={{height: '40px', width: '40px', borderRadius: 1000}}/> : <AccountCircleIcon />
                }
            </div>
        </div>
    </>
}

export default RenderDataContact