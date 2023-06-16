import "./sidebar.css"
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
    const location = useLocation();
    return ( 
        <div className="Sidebar">
            <div className="Sidebar-container-1">
                <img className="back-img" alt="Element"  src={process.env.PUBLIC_URL + "back.png"} />
            </div> 
            <div className="Sidebar-container-2">
                <Link to="/intro" className={location.pathname === "/intro" ? "active" : ""}>
                    <div className="Sidebar-home">
                        <img className="home-img" alt="Element"  src={process.env.PUBLIC_URL + "home.png"} />
                        <div className="text-1">홈</div>
                    </div>
                </Link>

                <div className="Sidebar-task">
                    <img className="task-img" alt="Element"  src={process.env.PUBLIC_URL + "task.png"} />
                    <div className="text-2">Task</div>
                    <Link to="/voc" className={location.pathname === "/voc" ? "active" : ""}>
                        <div className="text-3">VOC 내역</div>
                    </Link>
                    <Link to="/worker" className={location.pathname === "/worker" ? "active" : ""}>
                        <div className="text-4">사외공사자</div>
                    </Link>
                </div>

                <Link to="/notice" className={location.pathname === "/notice" ? "active" : ""}>
                    <div className="Sidebar-Notice">
                        <img className="notice-img" alt="Element"  src={process.env.PUBLIC_URL + "notice.png"} />
                        <div className="text-5">공지사항</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;