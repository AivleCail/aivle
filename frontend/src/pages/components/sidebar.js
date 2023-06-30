import "./sidebar.css"
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"

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
                <button classname = 'menu-bars' onClick={toggleNavMenu}><img src={isSidebarCollapsed ? process.env.PUBLIC_URL + "menu.png" : process.env.PUBLIC_URL + "back.png"} alt='menu'></img></button>
            </header>            
            <ul className='sidebar-ul'>
                
                <li><Link to="/intro" className={location.pathname === "/intro" ? "active" : ""}><i class = "fas fa-home"></i><span>홈</span></Link></li>
                <li><Link to="" className={location.pathname === "/voc" ? "active" : ""} onClick={toggleSubMenu}><img src={process.env.PUBLIC_URL + "task.png"} /><i class = "fas fa-Task"></i><span>Task</span></Link></li>
                
                <div className={`sub-menu ${isSubMenuOpen ? "active" : ""}` }>
                <li class = "sub-item" ><Link to="/voc" className={location.pathname === "/voc" ? "active" : ""}><span>VOC 내역</span></Link></li>
                <li class = "sub-item"><Link to="/worker" className={location.pathname === "/worker" ? "active" : ""}><span>사외공사 관리</span></Link></li>
                </div>
               

                <li><Link to="/article" className={location.pathname === "/article" ? "active" : ""}><img src={process.env.PUBLIC_URL + "notice.png"} /><i class = "fas fa-Article"></i><span>커뮤니티</span></Link></li>

                <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}><img src={process.env.PUBLIC_URL + "about.png"} /><i class = "fas fa-About"></i><span>About</span></Link></li>
            </ul>
        </div>

    );
}

export default Sidebar;