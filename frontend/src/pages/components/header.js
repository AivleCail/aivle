import "./header.scss"

const Header = () => {
    return (
        <div className="Header">
            <img className="header-img" alt="Element"  src={process.env.PUBLIC_URL + "/ktcs_img.png"} />
            <div className="header-title">오늘 하루도 화이팅하세요.</div>
            <div className="header-logout">로그아웃</div>
        </div>
    );
}

export default Header;