/* eslint-disable */
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database"; 
import React, { ReactNode } from 'react';
import CourseNavigation from './Navigation'; 
import Breadcrumb from './Breadcrumb'; 


interface Course {
    _id: string;
    name: string;
    [key: string]: any; 
}
// NOTE: We no longer strictly need CoursesLayoutProps interface here 
// because we are asserting the type directly on the function call.

// FIX: Change the function signature to 'async' and assert the props type globally
export default async function CoursesLayout(props: any) { // Assert props as 'any' for the component function

  // Cast the complex params object to the expected structure
  const params = props.params as { cid: string }; 
  const { children } = props;
  
  // Extract the course ID
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