/* eslint-disable */
"use client"
import { useParams } from "next/navigation";
import React, { useState } from 'react';
import { BsGripVertical } from "react-icons/bs"; 
import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap'; 
import LessonControlButtons from './LessonControlButtons'; 
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from "./ModulesControls";

// --- REDUX IMPORTS ---
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
// --- END REDUX IMPORTS ---

// Define interfaces
interface Lesson { _id: string; name: string; description: string; module: string; }
interface Module { _id: string; name: string; description: string; course: string; lessons?: Lesson[]; editing?: boolean; }

export default function Modules() {
  const { cid } = useParams();
  
  // --- REDUX STATE & DISPATCH ---
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  
  // 🛑 FIX for TypeScript Error (Line 25 in original code context):
  // We use a type assertion to inform TypeScript about the expected structure of the accountReducer state
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer as { currentUser: { role?: string, _id?: string } | null }
  );
  
  const dispatch = useDispatch();
  // --- END REDUX STATE & DISPATCH ---

  // 🛑 NEW LOGIC: Check if the user is Faculty
  const isFaculty = currentUser?.role === "FACULTY";

  const [moduleName, setModuleName] = useState("");

  return (
    <div id="wd-modules-screen">
      
      {/* 🛑 CONDITIONAL RENDERING: Hide the entire control bar from students */}
      {isFaculty && ( 
        <ModulesControls 
          moduleName={moduleName} 
          setModuleName={setModuleName} 
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }} 
        />
      )}

      <ListGroup id="wd-modules" className="rounded-0">
        
        {/* Filter and map over the modules from the REDUX store */}
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: Module) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            
            <div className="wd-title p-3 ps-2 bg-secondary">
              {/* Grip icon is visible to everyone */}
              <BsGripVertical className="me-2 fs-3" />
              
              {/* 🛑 CONDITIONAL RENDERING: In-line editing logic (input field) is only for faculty */}
              {isFaculty ? (
                // Faculty sees the editing experience
                module.editing ? (
                  <FormControl 
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                  />
                ) : (
                  // If not editing, display name for faculty
                  module.name
                )
              ) : (
                // Student just sees the module name (read-only)
                module.name
              )}
              {/* --- END IN-LINE EDITING LOGIC --- */}

              {/* 🛑 PASS isFaculty to ModuleControlButtons */}
              <ModuleControlButtons 
                moduleId={module._id}
                deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
                isFaculty={isFaculty} // ⬅️ NEW PROP
              /> 
            </div>
            
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
                  <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} 
                    {/* 🛑 PASS isFaculty to LessonControlButtons */}
                    <LessonControlButtons isFaculty={isFaculty} /> 
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