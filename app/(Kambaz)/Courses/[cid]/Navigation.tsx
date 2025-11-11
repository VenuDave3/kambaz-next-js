"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import React from 'react';
import { ListGroup } from 'react-bootstrap'; 

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams();
  
  // 1. Retrieve the Course ID (cid) from the URL parameters
  const { cid } = params;

  // 2. Data array of links as required by the assignment
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <ListGroup 
      id="wd-course-navigation" 
      className="wd-course-navigation me-4 list-group fs-5 rounded-0" 
      style={{ width: '150px' }}
    >
      {/* 3. Map over the links array */}
      {links.map((link) => {
        // FIX: DETERMINE PATH SUFFIX: Add '/Table' only if link is "People"
        const pathSuffix = link === 'People' ? '/Table' : '';
        
        // FIX: DETERMINE FULL HREF: Use the pathSuffix
        const hrefPath = `/Courses/${cid}/${link}${pathSuffix}`;

        // FIX: DETERMINE ACTIVE STATE: Check against the full, corrected path
        // This resolves the highlighting failure after fixing the 404
        const isActive = pathname.endsWith(link + pathSuffix);

        return (
          <Link
            key={link}
            // FIXED HREF
            href={hrefPath} 
            
            // FIXED HIGHLIGHTING LOGIC
            className={`list-group-item border-0 text-decoration-none 
                        ${isActive ? "text-danger bg-light" : "text-dark"}`}
            style={{ 
              textAlign: 'left', 
              borderLeft: isActive ? '2px solid red' : 'none',
              backgroundColor: isActive ? '#f8f9fa' : 'white',
              color: isActive ? 'red' : 'inherit'
            }}
          >
            {link}
          </Link>
        );
      })}
    </ListGroup>
  );
}