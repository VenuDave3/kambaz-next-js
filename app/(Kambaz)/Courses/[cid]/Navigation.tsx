"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import React from 'react';
import { ListGroup } from 'react-bootstrap'; 

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams();
  const { cid } = params;

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <ListGroup 
      id="wd-course-navigation" 
      className="wd-course-navigation me-4 list-group fs-5 rounded-0" 
      style={{ width: '150px' }}
    >
      {links.map((link) => {
        // ✅ FIX: Removed specific check for 'People'. 
        // All links now follow the standard pattern: /Courses/{cid}/{link}
        const hrefPath = `/Courses/${cid}/${link}`;

        // Check active state based on the clean URL
        const isActive = pathname.includes(link);

        return (
          <Link
            key={link}
            href={hrefPath} 
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