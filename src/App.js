// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Aboutus from './components/Aboutus';
import Blog from './components/Blog';
import Contactus from './components/Contactus';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import DownloadBrochure from './components/DownloadBrochure';
import Programs from './components/Programs';
import BlogAi from './components/BlogAi';
import BlogWhyAi from './components/BlogWhyAi';
import BlogAp from './components/BlogAp';
import BlogGen from './components/BlogGen';
import MyAccount from './components/MyAccount';
import Login from './components/Login';
import CoureseStart from './components/CoureseStart';
import CoursePage from './components/CoursePage';
import CourseOverview from './components/CourseOverview';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/ai" element={<BlogAi />} />
          <Route path="/blog/whyai" element={<BlogWhyAi />} />
          <Route path="/blog/applications" element={<BlogAp />} />
          <Route path="/blog/genai" element={<BlogGen />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/contact-us" element={<Contactus />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/download-brochure" element={<DownloadBrochure />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/Myaccount/Course/start/:videoUrl" element={<CoureseStart />} />
          <Route path="/Myaccount/Coursepage" element={<CoursePage />} />
          <Route path="/Coursepage" element={<CoursePage />} />
          <Route path="/Myaccount/CourseOverview/:id" element={<CourseOverview />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

