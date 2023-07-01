import React from "react";
import {Routes, Route} from "react-router-dom"
import Login from './pages/main/login/Login';
import Signup from './pages/main/signup/Signup';
import Intro from './pages/main/intro/intro';
import VOC from './pages/main/voc/voc';
import Worker from './pages/main/worker/worker'
import Article from './pages/main/article/articlelist'
import CreateArticle from './pages/main/article/createarticle'
import ExternalList from './pages/main/subcustomer/externalList'
import ExternalReceipt from './pages/main/subcustomer/externalReceipt'
import VocReceipt from './pages/main/subcustomer/vocReceipt'
import About from './pages/main/about/about';
import Develops from './pages/main/develops/develops';
import './App.css'
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>CaiL</title>
      </Helmet>
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
          <Route path="/about" element={<About />} />
          <Route path="/develops" element={<Develops/>} />
      </Routes>
    </div>
  );
}

export default App;
