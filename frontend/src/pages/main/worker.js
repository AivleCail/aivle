import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./worker.css"

const Worker = () => {
    return (
      <div className="worker-container">
        <Header />
        <Sidebar />
        <div className="background">
          <div className="container">
            <span className="text-1">사외공사 관리</span>
            <span className="text-2">협력체의 장애 신고 접수내용을 확인합니다.</span>
            
            <div className="worker">
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default Worker;