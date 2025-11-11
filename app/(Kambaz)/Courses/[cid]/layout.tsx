"use client";
import React, { ReactNode, useState } from 'react'; // 1. Import useState
/* eslint-disable */
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from './Navigation'; 
import Breadcrumb from './Breadcrumb'; 

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

interface Course {
    _id: string;
    name: string;
    [key: string]: any; 
}

export default function CoursesLayout({ children }: { children: ReactNode }) { 
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = (courses as Course[]).find((c) => c._id === cid);
  
  // 2. Add the state variable, defaulting to 'true' (visible)
  const [showNavigation, setShowNavigation] = useState(true);
  
  return (
    <div id="wd-courses">
      
      <Breadcrumb course={course} />
      <hr />
      
      <h2 className="text-danger">
        {/* 3. Add the onClick handler to the icon */}
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          style={{ cursor: "pointer" }} // Added to show it's clickable
          onClick={() => setShowNavigation(!showNavigation)} 
        />
        {course?.name} 
      </h2>
      <hr />
      
      <div className="d-flex flex-row">
        
        {/* 4. Conditionally render the Navigation */}
        {showNavigation && <CourseNavigation />} 
        
        <div id="wd-course-content" style={{ flexGrow: 1, paddingLeft: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}