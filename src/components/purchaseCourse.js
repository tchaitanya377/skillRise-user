import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';

const purchaseCourse = async (courseId) => {
  const user = auth.currentUser;
  if (user) {
    const courseRef = doc(db, `users/${user.uid}/purchasedCourses/${courseId}`);
    await setDoc(courseRef, {
      purchasedAt: new Date()
    });
    alert('Course purchased successfully!');
  } else {
    alert('User not authenticated');
  }
};
