"use client";
import React from "react";
import { usePathname } from "next/navigation";

// Define the required Course interface
interface Course {
    name: string;
}

export default function Breadcrumb({ course }: { course: Course | undefined; }) {
  const pathname = usePathname();
  
  // Get the last segment of the path (e.g., 'Home', 'Modules')
  const currentSection = pathname.split("/").pop();

  return (
    <div id="wd-breadcrumb">
      <span>
        {/* Safely display the course name passed from the layout */}
        Course {course?.name} &gt; {currentSection}
      </span>
    </div>
  );
}