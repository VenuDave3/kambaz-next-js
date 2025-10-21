/* eslint-disable */
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database"; 
import React, { ReactNode } from 'react';
// 1. ADD: Import the CourseNavigation component (from 3.8.5)
import CourseNavigation from './Navigation'; 
// 2. ADD: Import the Breadcrumb component (from 3.8.6)
import Breadcrumb from './Breadcrumb'; 


// NOTE: You must STILL define the interfaces for type safety
interface Course {
    _id: string;
    name: string;
    // FIX: Safely allow extra keys for the database object
    [key: string]: any; 
}
interface CoursesLayoutProps {
  children: ReactNode;
  params: {
    cid: string;
  };
}

// THIS IS THE CORE 3.8.4 LOGIC
export default function CoursesLayout({ children, params }: CoursesLayoutProps) {
  // Extract the course ID from the URL
  const { cid } = params;
  
  // Look up the matching course object
  const course = (courses as Course[]).find((c) => c._id === cid);
  
  return (
    <div id="wd-courses">
      
      {/* 3. UPDATE: Use the actual Breadcrumb component */}
      <Breadcrumb course={course} />
      <hr />
      
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {/* Displays the actual course name */}
        {course?.name} 
      </h2>
      <hr />
      
      <div className="d-flex flex-row">
        
        {/* 4. UPDATE: Use the actual CourseNavigation component */}
        <CourseNavigation /> 
        
        {/* Renders the page content */}
        <div id="wd-course-content" style={{ flexGrow: 1, paddingLeft: '20px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}