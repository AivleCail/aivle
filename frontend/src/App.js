import React from "react";
import {Routes, Route} from "react-router-dom"
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
/* import Intro from './pages/main/intro';
import VOC from './pages/main/voc';
import Notice from './pages/main/notice';*/


function App() {
  return (
    <div classNames="App">
     <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
