// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import CoursePage from './components/CoursePage';
import CourseOverview from './components/CourseOverview';
import MyAccount from './components/MyAccount';
import PurchasedCourses from './components/PurchasedCourses';
import CoureseStart from './components/CoureseStart';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/courses" element={<PrivateRoute element={CoursePage} />} />
            <Route path="/course/:id" element={<PrivateRoute element={CourseOverview} />} />
            <Route path="/myaccount" element={<PrivateRoute element={MyAccount} />} />
            <Route path="/purchased-courses" element={<PrivateRoute element={PurchasedCourses} />} />
            <Route path="/Myaccount/Course/start/:videoUrl" element={<PrivateRoute element={CoureseStart} />} />
            <Route path="/Myaccount/Coursepage" element={<PrivateRoute element={CoursePage} />} />
            <Route path="/Coursepage" element={<PrivateRoute element={CoursePage} />} />
            <Route path="/Myaccount/CourseOverview/:id" element={<PrivateRoute element={CourseOverview} />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
