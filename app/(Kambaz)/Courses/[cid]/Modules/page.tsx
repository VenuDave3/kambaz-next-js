/* eslint-disable */
"use client"
import { useParams } from "next/navigation";
import React, { useState, useEffect } from 'react'; // 1. ADD useEffect
import { BsGripVertical } from "react-icons/bs"; 
import { ListGroup, ListGroupItem, FormControl } from 'react-bootstrap';
import LessonControlButtons from './LessonControlButtons'; 
import ModuleControlButtons from './ModuleControlButtons';
import ModulesControls from "./ModulesControls";

// --- NEW IMPORTS (from 5.3.5) ---
// 2. We add 'setModules' and update the import path (to the non-crashing one)
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../../store"; // We'll use (state: any)
import * as client from "../../client"; // 3. Import the new Courses client
// --- END NEW IMPORTS ---

// Define interfaces
interface Lesson { _id: string; name: string; description: string; module: string; }
interface Module { _id: string; name: string; description: string; course: string; lessons?: Lesson[]; editing?: boolean; }

export default function Modules() {
  const { cid } = useParams();
  
  // --- REDUX STATE & DISPATCH (Using the "cheat" as requested) ---
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  // --- END REDUX STATE & DISPATCH ---

  // This local state is still needed for the "Add" form
  const [moduleName, setModuleName] = useState("");

  // --- NEW ASYNC DATA FETCHING (from 5.3.5.1) ---
  const fetchModules = async () => {
    // 4. Call the client to get modules for *this* course
    const modules = await client.findModulesForCourse(cid as string);
    // 5. Load the modules from the server into the Redux store
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, [cid]); // Re-fetch if the course ID changes
  // --- END NEW ASYNC DATA FETCHING ---

  
  // --- NEW ASYNC HANDLERS (from 5.3.5.2, 5.3.5.3, 5.3.5.4) ---
  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    // 6. Call the client to create the module on the server
    const module = await client.createModuleForCourse(cid as string, newModule);
    // 7. Update Redux store (as per textbook)
    dispatch(setModules([...modules, module]));
    setModuleName(""); // Clear the input
  };

  const onRemoveModule = async (moduleId: string) => {
    // 8. Call the client to delete the module from the server
    await client.deleteModule(moduleId);
    // 9. Update Redux store (as per textbook)
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    // 10. Call the client to update the module on the server
    await client.updateModule(module);
    // 11. Update Redux store (as per textbook)
    const newModules = modules.map((m: any) => m._id === module._id ? module : m );
    dispatch(setModules(newModules));
  };
  // --- END NEW ASYNC HANDLERS ---


  return (
    <div id="wd-modules-screen">
      
      {/* 12. Pass the new async 'onCreateModuleForCourse' to the controls */}
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={onCreateModuleForCourse} 
      />

      <ListGroup id="wd-modules" className="rounded-0">
        
        {/* 13. REMOVED the .filter()! The server already filtered for us. */}
        {modules.map((module: Module) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              
              {/* --- IN-LINE EDITING LOGIC (from 5.3.5.4) --- */}
              {!module.editing && module.name}
              { module.editing && (
                <FormControl 
                  className="w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(e) => 
                    // This updates the *local* Redux state on every keypress
                    dispatch(updateModule({ ...module, name: e.target.value })) 
                  }
                  onKeyDown={(e) => {
                    // This saves the change to the *server* on Enter
                    if (e.key === "Enter") {
                      onUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              )}
              {/* --- END IN-LINE EDITING LOGIC --- */}

              {/* 14. Pass the new async 'onRemoveModule' to the buttons */}
              <ModuleControlButtons 
                moduleId={module._id}
                deleteModule={(moduleId) => onRemoveModule(moduleId)}
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