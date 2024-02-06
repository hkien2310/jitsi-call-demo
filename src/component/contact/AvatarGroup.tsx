import { border, color } from "../../const/color";

interface IProps {
    groupName: string
    totalMember: number
}
const AvatarGroup = (props: IProps) => {
    const { groupName, totalMember } = props ?? {}
    // Tách thành mảng các từ
    let wordsArray = groupName.split(/\s|,\s*/);

    // Lọc và chỉ giữ lại các từ có độ dài lớn hơn 1
    let filteredArray = wordsArray.filter(word => word.length > 1);

    // Lấy chữ cái đầu của mỗi từ và nối chúng lại
    let result = filteredArray.map(word => word[0]).join('').slice(0, 2);
    return <div style={{ position: 'relative',border: border.main, borderRadius: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', width: '50px' }}>
        <div style={{position: 'absolute', border: border.main,fontSize: '15px', bottom: 0, right: 0, backgroundColor: 'white', paddingLeft: '2px',paddingRight: '2px', borderRadius: '5px', color: 'black'}}>
            {totalMember}
        </div>
        <div style={{  }}>
            {result}
        </div>
    </div>
}

export default AvatarGroup