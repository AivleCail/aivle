import "./sidebar.css"

const Sidebar = () => {
    return ( 
        <div className="Sidebar">
        <div className="Sidebar-container">
            <div className="Sidebar-home">홈</div>
            <div className="Sidebar-Notice">공지사항</div>
            <div className="Sidebar-Task">Task</div>
            <div className="Sidebar-VOC">VOC 내역</div>
            <div className="Sidebar-Worker">사외공사자</div>
        </div>
        </div>

    );
}

export default Sidebar;