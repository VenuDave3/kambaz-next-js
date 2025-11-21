/* eslint-disable */
// app/(Kambaz)/Courses/[cid]/Modules/page.tsx

"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import { BsGripVertical } from "react-icons/bs"; 
import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap';
import LessonControlButtons from './LessonControlButtons'; 
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from "./ModulesControls";
// --- Redux Imports ---
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
// --- Client API Import ---
import * as client from "../../client"; 

// Define interfaces to ensure your component is type-safe
interface Lesson { _id: string; name: string; description: string; module: string; }
interface Module { _id: string; name: string; description: string; course: string; lessons?: Lesson[]; editing?: boolean; }

export default function Modules() {
  const { cid } = useParams();
  
  // --- REDUX STATE & DISPATCH ---
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  // --- END REDUX STATE & DISPATCH ---

  // This local state is still needed for the "Add" form
  const [moduleName, setModuleName] = useState("");

  // --- READ: Fetch modules from server ---
  const fetchModules = async () => {
    // 1. CRITICAL CHECK: Ensure cid is available before fetching
    if (!cid) return; 
    
    // The client API uses 'cid' to fetch data
    const modules = await client.findModulesForCourse(cid as string);
    
    // Load the modules from the server into the Redux store
    dispatch(setModules(modules));
  };
  
  // --- LIFECYCLE: Fetch data when CID is available/changes ---
  // 2. CRITICAL FIX: The dependency array must include [cid] to trigger fetch
  // when the course changes or when the component first mounts and cid is defined.
  useEffect(() => {
    fetchModules();
  }, [cid]); 

  
  // --- CRUD HANDLERS ---
  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    
    const module = await client.createModuleForCourse((cid as string), newModule);
    
    // Update Redux store: append new module
    dispatch(setModules([...modules, module]));
    setModuleName(""); // Clear the input field
  };

  const onRemoveModule = async (moduleId: string) => {
    // Delete from server
    await client.deleteModule(moduleId);
    
    // Update Redux by filtering the module out
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    // Update on server
    await client.updateModule(module);
    
    // Update Redux state
    const newModules = modules.map((m: any) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
  };
  // --- END CRUD HANDLERS ---


  return (
    <div id="wd-modules-screen">
      
      <ModulesControls 
        moduleName={moduleName} setModuleName={setModuleName}
        addModule={onCreateModuleForCourse} 
      />
      {/* Retaining your original structure for spacing */}
      <br /><br /><br />
      
      <ListGroup id="wd-modules" className="rounded-0">
        
        {modules.map((module: any) =>(
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              
              {/* --- IN-LINE EDITING LOGIC --- */}
              {!module.editing && module.name}
              { module.editing && (
                <FormControl 
                  className="w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(e) => 
                    // Update local Redux state immediately on keypress
                    dispatch(updateModule({ ...module, name: e.target.value })) 
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false }); // Save to server and exit edit mode
                    }
                  }}
                />
              )}
              {/* --- CONTROL BUTTONS --- */}
              <ModuleControlButtons 
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              /> 
            </div>
            
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
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