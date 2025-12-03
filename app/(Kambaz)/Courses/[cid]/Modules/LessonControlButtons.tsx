'use client';
import { IoEllipsisVertical } from 'react-icons/io5';
import GreenCheckmark from './GreenCheckmark';

// 🛑 MODIFICATION 1: Update component to accept the isFaculty prop
export default function LessonControlButtons({ 
  isFaculty 
}: { 
  isFaculty: boolean; // ⬅️ NEW PROP TYPE DEFINITION
}) {
  return (
    <div className="float-end">
      
      {/* 🛑 MODIFICATION 2: Only show controls (Checkmark & Ellipsis) if faculty */}
      {isFaculty ? (
        // Faculty sees the controls
        <>
          <GreenCheckmark />
          <IoEllipsisVertical className="fs-4" />
        </>
      ) : (
        // Students see nothing, or perhaps just the basic Green Checkmark if lessons are published
        // For simplicity and security, we'll hide the actions, but keep the checkmark only 
        // if its status indicates "published" and isn't tied to an action menu.
        // Given your current implementation: We'll wrap the whole group.
        null
      )}
      {/* 🛑 END FACULTY CHECK */}
      
    </div>
  );
}