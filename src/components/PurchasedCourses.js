// src/components/PurchasedCourses.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const purchasedCoursesRef = collection(db, `users/${user.uid}/purchasedCourses`);
          const purchasedCoursesSnapshot = await getDocs(purchasedCoursesRef);
          const purchasedCourseIds = purchasedCoursesSnapshot.docs.map(doc => doc.id);

          if (purchasedCourseIds.length > 0) {
            const coursesQuery = query(collection(db, 'courses'), where('__name__', 'in', purchasedCourseIds));
            const coursesSnapshot = await getDocs(coursesQuery);
            const coursesData = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCourses(coursesData);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  const purchaseCourse = async (courseId) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const courseRef = doc(db, `users/${user.uid}/purchasedCourses/${courseId}`);
        await setDoc(courseRef, {
          purchasedAt: new Date()
        });
        toast.success('Course purchased successfully!', { autoClose: 2000 });
      } catch (error) {
        console.error('Error purchasing course:', error);
        toast.error('Error purchasing course', { autoClose: 2000 });
      }
    } else {
      toast.error('User not authenticated', { autoClose: 2000 });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Purchased Courses</h1>
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
            <Link
              to={`/Myaccount/CourseOverview/${course.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              View Course
            </Link>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default PurchasedCourses;
