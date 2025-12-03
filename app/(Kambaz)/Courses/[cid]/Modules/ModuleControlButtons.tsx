'use client';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from './GreenCheckmark';

// 🛑 MODIFICATION 1: Update component to accept the isFaculty prop
export default function ModuleControlButtons({ 
  moduleId, 
  deleteModule,
  editModule,
  isFaculty // ⬅️ NEW PROP
}: { 
  moduleId: string; 
  deleteModule: (moduleId: string) => void; 
  editModule: (moduleId: string) => void;
  isFaculty: boolean; // ⬅️ NEW PROP TYPE DEFINITION
}) {
  
  return (
    <div
      id="wd-module-controls"
      className="float-end position-relative"
    >
      {/* 🛑 MODIFICATION 2: Only render CRUD actions if the user is faculty */}
      {isFaculty ? (
        <>
          <FaPencil 
            onClick={() => editModule(moduleId)} 
            className="text-primary me-3" 
            style={{ cursor: "pointer" }}
          />
          
          <FaTrash 
            className="text-danger me-2 mb-1" 
            style={{ cursor: "pointer" }}
            onClick={() => deleteModule(moduleId)} 
          />
          
          {/* The "Add Lesson" button (BsPlus) is also a CRUD operation */}
          <BsPlus className="fs-4 me-1" />
        </>
      ) : (
        // Students don't see any of the action buttons here
        null 
      )}
      {/* 🛑 END FACULTY CHECK for CRUD buttons */}

      {/* Non-CRUD icons (like the checkmark and vertical ellipsis) are visible to everyone */}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}