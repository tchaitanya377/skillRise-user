import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc,setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../Firebase'; // Ensure to import auth from firebase
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseOverview = () => {
  const { id: courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('context'); // Default tab is 'context'
  const [isPurchased, setIsPurchased] = useState(false); // State to track if the course is purchased

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleSection = (index) => {
    setCourse((prevState) => ({
      ...prevState,
      subCourses: prevState.subCourses.map((subCourse, i) => {
        if (i === index) {
          return { ...subCourse, isOpen: !subCourse.isOpen };
        }
        return subCourse;
      }),
    }));
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseRef = doc(db, 'courses', courseId);
        const docSnap = await getDoc(courseRef);
  
        if (!docSnap.exists()) {
          setLoading(false);
          return;
        }
  
        const courseData = docSnap.data();
        setCourse(courseData); 

        // Check if the course is purchased
        const user = auth.currentUser;
        if (user) {
          const purchasedCoursesRef = collection(db, `users/${user.uid}/purchasedCourses`);
          const purchasedCoursesSnapshot = await getDocs(query(purchasedCoursesRef, where('__name__', '==', courseId)));
          if (!purchasedCoursesSnapshot.empty) {
            setIsPurchased(true);
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  
    fetchCourseData();
  }, [courseId]);

  const handleBuy = async (courseId) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const courseRef = doc(db, `users/${user.uid}/purchasedCourses/${courseId}`);
        await setDoc(courseRef, {
          purchasedAt: new Date()
        });
        setIsPurchased(true); // Set the course as purchased
        toast.success(`Course ${courseId} purchased!`);
      } catch (error) {
        toast.error('Error purchasing course');
      }
    } else {
      toast.error('User not authenticated');
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!course) {
    return <div>No data found for courseId: {courseId}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg mb-4">
        <img
          src={course.courseThumbnailURL}
          alt={course.courseName}
          className="w-full md:w-1/3 h-auto rounded-lg object-cover"
        />
        <div className="w-full md:w-2/3 pl-4">
          <h2 className="text-xl font-bold">{course.courseName}</h2>
          <p className="text-lg mt-2">{course.courseDescription}</p>
          {!isPurchased && (
            <button
              onClick={() => handleBuy(courseId)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300 mt-4"
            >
              Buy
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white rounded shadow">
        <h3 className="text-lg font-semibold p-4">Activities</h3>
        <div className="flex space-x-4 p-4">
          <button
            className={`flex-1 p-2 rounded ${activeTab === 'context' ? 'bg-blue-200' : 'bg-gray-200'}`}
            onClick={() => handleTabChange('context')}
          >
            CONTEXT
          </button>
          <button
            className={`flex-1 p-2 rounded ${activeTab === 'recordings' ? 'bg-blue-200' : 'bg-gray-200'}`}
            onClick={() => handleTabChange('recordings')}
          >
            LIVE RECORDINGS & SESSIONS
          </button>
          <button
            className={`flex-1 p-2 rounded ${activeTab === 'assignments' ? 'bg-blue-200' : 'bg-gray-200'}`}
            onClick={() => handleTabChange('assignments')}
          >
            ASSIGNMENTS
          </button>
        </div>

        {activeTab === 'context' && (
          <div className="p-4">
            {/* Rendering of context section */}
            {course.subCourses.map((subCourse, index) => (
              <div key={index} className="mb-4">
                <button
                  className="flex justify-between items-center w-full text-left bg-white text-gray-800 hover:text-blue-500 focus:outline-none px-4 py-2 rounded-md"
                  onClick={() => toggleSection(index)}
                >
                  <span className="font-semibold text-lg">{subCourse.name}</span>
                  <svg
                    className={`w-6 h-6 transition-transform ${subCourse.isOpen ? 'transform rotate-90' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {subCourse.isOpen && (
                  <div className="mt-2 space-y-2">
                    {subCourse.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center justify-between bg-white px-4 py-2 rounded-md">
                        <span className="text-gray-800">{topic.name}</span>
                        {isPurchased && (
                          <Link 
                            to={`/Myaccount/Course/start/${encodeURIComponent(topic.videoUrl)}`}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:text-blue-600"
                          >
                            Go to Lecture
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recordings' && (
          <div className="p-4 border rounded-lg">
            {/* Rendering of recordings section */}
            {course.subCourses.map((subCourse, index) => (
              <div key={index} className="mb-4">
                {subCourse.additionalContents
                  .filter(content => content.type === 'recordings')
                  .map((content, contentIndex) => (
                    <div key={contentIndex} className="flex items-center justify-between bg-white px-4 py-2 rounded-md">
                      <span className="text-gray-800">{content.name}</span>
                      {isPurchased && (
                        <Link 
                          to={`/Myaccount/Course/start/${encodeURIComponent(content.value)}`}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:text-blue-600"
                        >
                          Go to Lecture
                        </Link>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="p-4 border rounded-lg">
            {/* Rendering of assignments section */}
            {course.subCourses.map((subCourse, index) => (
              <div key={index} className="mb-4">
                {subCourse.additionalContents
                  .filter(content => content.type === 'assignment')
                  .map((content, contentIndex) => (
                    <div key={contentIndex} className="flex items-center justify-between bg-white px-4 py-2 rounded-md">
                      <span className="text-gray-800">{content.name}</span>
                      {isPurchased && (
                        <a href={content.value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                          View Assignment
                        </a>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer /> {/* Toast container for displaying messages */}
    </div>
  );
};

export default CourseOverview;
