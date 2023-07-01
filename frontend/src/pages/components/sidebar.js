import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import "./sidebar.css"

const Sidebar = () => {
    const location = useLocation();
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
    const toggleNavMenu = () => {
        setIsSidebarCollapsed((prevState) => !prevState);
      };
 
    const toggleSubMenu = () => {
      setIsSubMenuOpen((prevState) => !prevState);
    };
  
    const sidebarClass = isSidebarCollapsed ? 'Sidebar collapsed' : 'Sidebar';

    return ( 
        <div className={sidebarClass}>
            <header>
                <button className = 'menu-bars' onClick={toggleNavMenu}>
                    <img src={isSidebarCollapsed ? process.env.PUBLIC_URL + "menu.svg" : process.env.PUBLIC_URL + "left-arrow.svg"} alt='menu'></img>
                </button>
            </header>            
            <ul className='sidebar-ul'>
                <li>
                    <Link to="/intro" className={location.pathname === "/intro" ? "active" : ""}>
                        <img src={process.env.PUBLIC_URL + "home.svg"} alt='home'/><span>홈</span>
                    </Link>
                </li>
                <li>
                    <Link to="" className={location.pathname === "/voc" ? "active" : ""} onClick={toggleSubMenu}>
                        <img src={process.env.PUBLIC_URL + "tools.svg"} alt='task'/><span>Task</span>
                    </Link>
                </li>
                <div className={`sub-menu ${isSubMenuOpen ? "active" : ""}` }>
                    <li className = "sub-item">
                        <Link to="/voc" className={location.pathname === "/voc" ? "active" : ""}><span>VOC 내역</span></Link>
                    </li>
                    <li className = "sub-item">
                        <Link to="/worker" className={location.pathname === "/worker" ? "active" : ""}><span>사외공사 관리</span></Link>
                    </li>
                </div>
                <li>
                    <Link to="/article" className={location.pathname === "/article" ? "active" : ""}>
                        <img src={process.env.PUBLIC_URL + "board.svg"} alt='notice'/><span>커뮤니티</span>
                    </Link>
                </li>
                <li>
                    <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
                        <img src={process.env.PUBLIC_URL + "lightbulb.svg"} alt='about'/><span>About</span>
                    </Link>
                </li>
                <li>
                    <Link to="/develops" className={location.pathname === "/develops" ? "active" : ""}>
                        <img src={process.env.PUBLIC_URL + "people.svg"} alt='teams'/><span>Develops</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;