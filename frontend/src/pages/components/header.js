import "./header.css"
import {Link} from "react-router-dom"

const Header = () => {
    return (
        <div className="Header">
            <Link to="/intro">
            <img className="header-img" alt="Element" src={process.env.PUBLIC_URL + "/login_logo.png"} />
            </Link>
            <div className="header-title">오늘 하루도 화이팅하세요.</div>
            <div className="header-logout"><Link to="/">로그아웃</Link></div>
        </div>
    );
}

export default Header;