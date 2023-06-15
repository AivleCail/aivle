import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "./intro.css"

const Intro = () => {
    return (
      <div className="intro-container">
        <Header />
        <Sidebar />
        <div className="background">
        </div>
      </div>
    );
  };
  

export default Intro;