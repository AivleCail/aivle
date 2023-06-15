import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./voc.css"

const VOC = () => {
    return (
      <div className="voc-container">
        <Header />
        <Sidebar />

        <div className="background">
          <div className="container">
            <span className="text-1">VOC 내역</span>
            <span className="text-2">고객들의 장애 조치 여부를 확인합니다.</span>
            
            <div className="board">
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default VOC;