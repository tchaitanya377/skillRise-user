// App.js
import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from './Firebase';
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

// SessionValidator component to handle session validation and logout
const SessionValidator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getDeviceId = () => {
      let deviceId = localStorage.getItem('device-id');
      if (!deviceId) {
        deviceId = uuidv4();
        localStorage.setItem('device-id', deviceId);
      }
      return deviceId;
    };

    const deviceId = getDeviceId();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const sessionRef = doc(db, 'sessions', user.uid);
        const unsubscribeSession = onSnapshot(sessionRef, (doc) => {
          if (doc.exists()) {
            const sessionData = doc.data();
            if (sessionData.device !== deviceId) {
              auth.signOut().then(() => {
                localStorage.removeItem('device-id');
                navigate('/');
                toast.info('You have been logged out due to login from another device.');
              });
            }
          }
        });
        return () => unsubscribeSession();
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <SessionValidator />
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
        <ToastContainer /> {/* Toast container for displaying messages */}
      </div>
    </Router>
  );
}

export default App;
