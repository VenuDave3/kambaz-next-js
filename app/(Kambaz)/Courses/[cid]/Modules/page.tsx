/* eslint-disable */
"use client"
import { useParams } from "next/navigation";
import React, { useState } from 'react';
import { BsGripVertical } from "react-icons/bs"; 
import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap'; // 1. Import FormControl
import LessonControlButtons from './LessonControlButtons'; 
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from "./ModulesControls";

// --- NEW REDUX IMPORTS ---
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
  const dispatch = useDispatch();
  // --- END REDUX STATE & DISPATCH ---

  // We still keep 'moduleName' in local state for the *add* form
  const [moduleName, setModuleName] = useState("");

  // All local functions (addModule, deleteModule) are GONE.
  // We will dispatch actions directly.

  return (
    <div id="wd-modules-screen">
      
      {/* Pass Redux-dispatching functions to the controls */}
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }} 
      />

      <ListGroup id="wd-modules" className="rounded-0">
        
        {/* Filter and map over the modules from the REDUX store */}
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: Module) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              
              {/* --- IN-LINE EDITING LOGIC (from 4.4.3.3) --- */}
              {!module.editing && module.name}
              { module.editing && (
                <FormControl 
                  className="w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(e) =>
                    // Dispatch update on every key stroke
                    dispatch(
                      updateModule({ ...module, name: e.target.value })
                    )
                  }
                  onKeyDown={(e) => {
                    // Dispatch update (to set editing: false) on Enter
                    if (e.key === "Enter") {
                      dispatch(updateModule({ ...module, editing: false }));
                    }
                  }}
                />
              )}
              {/* --- END IN-LINE EDITING LOGIC --- */}

              {/* Pass Redux-dispatching functions to the buttons */}
              <ModuleControlButtons 
                moduleId={module._id}
                deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              /> 
            </div>
            
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
                  <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} 
                    <LessonControlButtons />
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