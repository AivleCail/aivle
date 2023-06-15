import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./notice.css"

const Notice = () => {
    return (
      <div className="notice-container">
        <Header />
        <Sidebar />
        
        <div className="background">
          <div className="container">
            <span className="text-1">공지사항</span>
            <span className="text-2">공지사항을 빠르고 정확하게 안내해드립니다.</span>
            
            <div className="notice">
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default Notice;