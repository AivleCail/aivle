import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./voc.css"
import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';

const VOC = () => {
    return (
      <div className="voc-container">
        <Header />
        <Sidebar />

        <div className="background">
          <div className="container">
            <span className="voc-text-1">VOC 내역</span>
            <span className="voc-text-2">고객들의 장애 조치 여부를 확인합니다.</span>
            <img className="voc-img" alt="Element" src={process.env.PUBLIC_URL + "/refresh-arrow.png"} />
            
            <div className="board">
              <CommonTable headersName={['쳌','번호', '고객명', '지역', '전화번호', '장애유형', '접수 일시', '조치여부']}>
                <CommonTableRow>
                  <CommonTableColumn>ㅁ</CommonTableColumn>
                  <CommonTableColumn>8</CommonTableColumn>
                  <CommonTableColumn>교육장</CommonTableColumn>
                  <CommonTableColumn>부산광역시 동구 초량중로 29</CommonTableColumn>
                  <CommonTableColumn>010-1234-1234</CommonTableColumn>
                  <CommonTableColumn>인터넷 고장</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn className='status'>X</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn>7</CommonTableColumn>
                  <CommonTableColumn>이전교육</CommonTableColumn>
                  <CommonTableColumn>부산광역시 중구 충장대로5번길 72</CommonTableColumn>
                  <CommonTableColumn>010-1234-1234</CommonTableColumn>
                  <CommonTableColumn>인터넷 고장</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn className='status'>O</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn>6</CommonTableColumn>
                  <CommonTableColumn>하이텐</CommonTableColumn>
                  <CommonTableColumn>부산광역시 진구 중앙대로 682-1 3, 4층</CommonTableColumn>
                  <CommonTableColumn>010-1234-1234</CommonTableColumn>
                  <CommonTableColumn>인터넷 고장일까</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn className='status'>X</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn>5</CommonTableColumn>
                  <CommonTableColumn>이마트</CommonTableColumn>
                  <CommonTableColumn>부산광역시 금정구 중앙대로 1841번길 24</CommonTableColumn>
                  <CommonTableColumn>010-1234-1234</CommonTableColumn>
                  <CommonTableColumn>인터넷 고장</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn className='status'>X</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn>4</CommonTableColumn>
                  <CommonTableColumn>에벱베</CommonTableColumn>
                  <CommonTableColumn>울산광역시 남구 중앙로75번길 00, OOOOOO아파트 102동 1106호 </CommonTableColumn>
                  <CommonTableColumn>010-1234-1234</CommonTableColumn>
                  <CommonTableColumn>인터넷 고장</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn className='status'>O</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn>3</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn className='status'></CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn>2</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn className='status'></CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow className='last-row'>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn>1</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn className='status'></CommonTableColumn>
                </CommonTableRow>
              </CommonTable>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default VOC;