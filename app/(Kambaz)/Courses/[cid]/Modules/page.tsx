"use client"
import { useParams } from "next/navigation";
import { modules } from "../../../Database"; // Import the modules array
import React from 'react';
import { BsGripVertical } from "react-icons/bs"; // For the drag handle icon
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'; // Import UI components
// NOTE: Ensure these imports match your actual control button component names
import LessonControlButtons from './LessonControlButtons'; 
import ModuleControlButtons from './ModuleControlButtons'; 

// Define interfaces for type safety (avoids the "module: any" warning)
interface Lesson { _id: string; name: string; description: string; module: string; }
interface Module { _id: string; name: string; description: string; course: string; lessons?: Lesson[]; }

export default function Modules() {
  // 1. Retrieve the current Course ID (cid) from the URL
  const { cid } = useParams();
  
  // 2. Filter the global modules list by the current course ID
  const courseModules = (modules as Module[]).filter(
    (module) => module.course === cid
  );

  return (
    <div id="wd-modules-screen">
      
      {/* Module controls (Using standard Bootstrap buttons for simplicity) */}
      <div className="d-flex justify-content-end mb-3">
          <Button variant="secondary" className="me-1">Collapse All</Button>
          <Button variant="secondary" className="me-1">View Progress</Button>
          <Button variant="secondary" className="me-1">Publish All</Button>
          <Button variant="danger">+</Button>
          <Button variant="secondary" className="ms-1">...</Button>
      </div>

      <ListGroup id="wd-modules" className="rounded-0">
        
        {/* 3. DYNAMIC RENDERING: Map over the filtered course modules */}
        {courseModules.map((module: Module) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            
            {/* Module Title/Header */}
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons />
            </div>
            
            {/* NESTED LESSONS: Render only if the module has lessons array */}
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
                  <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}