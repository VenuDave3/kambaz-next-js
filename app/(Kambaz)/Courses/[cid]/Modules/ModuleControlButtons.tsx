'use client';
import { IoEllipsisVertical } from 'react-icons/io5';
import { BsPlus } from 'react-icons/bs';
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6"; // 1. Import new pencil icon
import GreenCheckmark from './GreenCheckmark';

// 2. Add 'editModule' to the props
export default function ModuleControlButtons({ 
  moduleId, 
  deleteModule,
  editModule
}: { 
  moduleId: string; 
  deleteModule: (moduleId: string) => void; 
  editModule: (moduleId: string) => void;
}) {
  return (
    <div
      id="wd-module-controls"
      className="float-end position-relative"
    >
      {/* 3. Add the pencil icon and its onClick handler */}
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
      
      {/* Your other existing icons */}
      <GreenCheckmark />
      <BsPlus className="fs-4 me-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}