import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import MyNav from './MyNav';

const CourseStart = () => {
  const { videoUrl } = useParams();
  const decodedVideoUrl = decodeURIComponent(videoUrl);

  return (
    <>
      <MyNav />
      <div className="container mx-auto mt-8">
        <ReactPlayer url={decodedVideoUrl} controls={true} width="100%" height="100vh" />
      </div>
    </>
  );
};

export default CourseStart;
