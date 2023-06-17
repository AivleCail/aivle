import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./notice.css";
import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';
import Paging from './page/paging';


const Notice = () => {
    return (
      <div className="notice-container">
        <Header />
        <Sidebar />
        
        <div className="background">
          <div className="container">
            <span className="notice-text-1">공지사항</span>
            <span className="notice-text-2">공지사항을 빠르고 정확하게 안내해드립니다.</span>
            
            <div className="notice">
            <CommonTable headersName={['번호', '제목', '글쓴이', '작성일', '조회']}>
                <CommonTableRow>
                  <CommonTableColumn>8</CommonTableColumn>
                  <CommonTableColumn>이렇게 하면 되는게 맞나...</CommonTableColumn>
                  <CommonTableColumn>신선혜</CommonTableColumn>
                  <CommonTableColumn>2023.06.16</CommonTableColumn>
                  <CommonTableColumn>0</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>7</CommonTableColumn>
                  <CommonTableColumn>배고프답</CommonTableColumn>
                  <CommonTableColumn>홍길동</CommonTableColumn>
                  <CommonTableColumn>2023.06.16</CommonTableColumn>
                  <CommonTableColumn>0</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>6</CommonTableColumn>
                  <CommonTableColumn>으에에</CommonTableColumn>
                  <CommonTableColumn>신짱구</CommonTableColumn>
                  <CommonTableColumn>2023.06.16</CommonTableColumn>
                  <CommonTableColumn>0</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>5</CommonTableColumn>
                  <CommonTableColumn>짱돌..</CommonTableColumn>
                  <CommonTableColumn>맹구</CommonTableColumn>
                  <CommonTableColumn>2023.06.16</CommonTableColumn>
                  <CommonTableColumn>0</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>4</CommonTableColumn>
                  <CommonTableColumn>...</CommonTableColumn>
                  <CommonTableColumn>김철수</CommonTableColumn>
                  <CommonTableColumn>2023.06.16</CommonTableColumn>
                  <CommonTableColumn>0</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>3</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>2</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow className='last-row'>
                  <CommonTableColumn>1</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                </CommonTableRow>
              </CommonTable>
            </div>

            <Paging />
          </div>
        </div>
      </div>
    );
  };
  

export default Notice;