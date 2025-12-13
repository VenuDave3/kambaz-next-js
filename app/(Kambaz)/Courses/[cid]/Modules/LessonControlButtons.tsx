'use client';
import { IoEllipsisVertical } from 'react-icons/io5';
import GreenCheckmark from './GreenCheckmark';

export default function LessonControlButtons({ isFaculty }: { isFaculty: boolean }) {
  // If the user is not faculty, only render the Ellipsis icon.
  if (!isFaculty) {
    return (
      <div className="float-end">
        <IoEllipsisVertical className="fs-4" />
      </div>
    );
  }
  
  // If the user is faculty, render the GreenCheckmark (and Ellipsis)
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}