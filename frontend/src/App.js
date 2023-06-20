import React from "react";
import {Routes, Route} from "react-router-dom"
import Login from './pages/login/Login';
import Signup from './pages/login/Signup';
import Intro from './pages/main/intro';
import VOC from './pages/main/voc';
import Worker from './pages/main/worker'
import Article from './pages/main/article/articlelist'
import CreateArticle from './pages/main/article/createarticle'
import ExternalList from './pages/subcustomer/externalList'
import ExternalReceipt from './pages/subcustomer/externalReceipt'
import VocReceipt from './pages/subcustomer/vocReceipt'
import './App.css'

function App() {
  return (
    <div className="App">
     <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/voc" element={<VOC />} />
          <Route path="/worker" element={<Worker />} />
          <Route path="/article" element={<Article />} />
          <Route path="/createarticle" element={<CreateArticle />} />
          <Route path="/myexternal" element={<ExternalList />} />
          <Route path="/externalreceipt" element={<ExternalReceipt />} />
          <Route path="/vocreceipt" element={<VocReceipt />} />
      </Routes>
    </div>
  );
}

export default App;
