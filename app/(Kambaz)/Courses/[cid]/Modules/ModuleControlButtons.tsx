'use client';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6"; 
import GreenCheckmark from './GreenCheckmark';

export default function ModuleControlButtons({ 
  moduleId, 
  deleteModule,
  editModule,
  isFaculty
}: { 
  moduleId: string; 
  deleteModule: (moduleId: string) => void; 
  editModule: (moduleId: string) => void;
  isFaculty: boolean;
}) {
  if (!isFaculty) {
    return (
      // If the user is not faculty, render only the Ellipsis icon (or nothing, depending on design)
      <div id="wd-module-controls" className="float-end position-relative">
        <IoEllipsisVertical className="fs-4" />
      </div>
    );
  }

  // If the user is faculty, render all CRUD controls
  return (
    <div
      id="wd-module-controls"
      className="float-end position-relative"
    >
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
      
      <GreenCheckmark />
      <BsPlus className="fs-4 me-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}