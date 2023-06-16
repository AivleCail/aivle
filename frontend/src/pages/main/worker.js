import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./worker.css"
import CommonTable from '../components/table/CommonTable';
import CommonTableColumn from '../components/table/CommonTableColumn';
import CommonTableRow from '../components/table/CommonTableRow';


const Worker = () => {
    return (
      <div className="worker-container">
        <Header />
        <Sidebar />
        <div className="background">
          <div className="container">
            <span className="worker-text-1">사외공사 관리</span>
            <span className="worker-text-2">협력체의 장애 신고 접수내용을 확인합니다.</span>
            
            <div className="worker">
              <CommonTable headersName={['번호', '업체명', '공사주소', '공사시작시간', '접수 일시', 'ID', '완료여부']}>
                <CommonTableRow>
                  <CommonTableColumn>8</CommonTableColumn>
                  <CommonTableColumn>A업체</CommonTableColumn>
                  <CommonTableColumn>부산광역시 동구 초량중로 29</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 10:35</CommonTableColumn>
                  <CommonTableColumn>aivle123</CommonTableColumn>
                  <CommonTableColumn>X</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>7</CommonTableColumn>
                  <CommonTableColumn>B업체</CommonTableColumn>
                  <CommonTableColumn>부산광역시 중구 충장대로5번길 72</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 10:35</CommonTableColumn>
                  <CommonTableColumn>aivle123</CommonTableColumn>
                  <CommonTableColumn>X</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>6</CommonTableColumn>
                  <CommonTableColumn>C업체</CommonTableColumn>
                  <CommonTableColumn>부산광역시 진구 중앙대로 682-1 3, 4층</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 10:35</CommonTableColumn>
                  <CommonTableColumn>aivle695</CommonTableColumn>
                  <CommonTableColumn>X</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>5</CommonTableColumn>
                  <CommonTableColumn>A업체</CommonTableColumn>
                  <CommonTableColumn>부산광역시 금정구 중앙대로 1841번길 24</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 16:35</CommonTableColumn>
                  <CommonTableColumn>2023-06-16 10:35</CommonTableColumn>
                  <CommonTableColumn>aivle695</CommonTableColumn>
                  <CommonTableColumn>X</CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>4</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>3</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
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
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                </CommonTableRow>
                <CommonTableRow>
                  <CommonTableColumn>1</CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                  <CommonTableColumn></CommonTableColumn>
                </CommonTableRow>
              </CommonTable>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default Worker;