// src/components/CoursePage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyBO-0m_dczIjwuiU8fj0-ZaWLUthpBQV3U",
  authDomain: "skillrise-52dfc.firebaseapp.com",
  projectId: "skillrise-52dfc",
  storageBucket: "skillrise-52dfc.appspot.com",
  messagingSenderId: "470730494073",
  appId: "1:470730494073:web:fdce2029cb61cac3a9c4a8",
  measurementId: "G-NMHWJW0E51"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const coursesData = [];
        querySnapshot.forEach(doc => {
          coursesData.push({ id: doc.id, ...doc.data() });
        });
        setCourses(coursesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBuy = (courseId) => {
    // Implement the purchase logic here
    toast.success(`Course ${courseId} purchased!`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8">Our Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={course.courseThumbnailURL}
                alt={course.courseName}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-2xl font-bold mb-2">{course.courseName}</h3>
              <p className="text-gray-700 mb-4">{course.courseDescription}</p>
              {/* <p className="text-lg font-semibold mb-4">Price: ₹{course.price}</p> */}
              <div className="flex justify-between">
                <button
                  onClick={() => handleBuy(course.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Buy
                </button>
                <Link
                  to={{
                    pathname: `/Myaccount/CourseOverview/${course.id}`,
                    state: { courseId: course.id } // Pass the course ID as state
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
                >
                  More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer /> {/* Toast container for displaying messages */}
    </>
  );
}

export default CoursePage;
