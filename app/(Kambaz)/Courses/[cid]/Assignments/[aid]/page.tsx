/* eslint-disable */

'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { assignments } from "../../../../Database"; 
import React from 'react';
import { FaEllipsisV } from "react-icons/fa";

// Define the interface for Assignment
interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    due_date: string;
    available_date: string;
    assignment_type: string;
    submission_type: string;
    group_name: string;
    [key: string]: any;
}

// NOTE: The 'renderOption' function is removed to fix the error.

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 

  const assignmentList: Assignment[] = assignments as Assignment[];
  const assignment = assignmentList.find((a) => a._id === aid);
  
  const assignmentsPath = `/Courses/${cid}/Assignments`;

  if (!assignment) {
    return <div id="wd-assignment-editor" className="p-3">Assignment Not Found (ID: {aid})</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      
      {/* Header and Controls */}
      <div className="d-flex justify-content-end align-items-center mb-4">
        <div className="text-success fw-bold me-3">Published</div>
        <button type="button" className="btn btn-secondary me-2">
          <FaEllipsisV />
        </button>
      </div>
      <hr />

      <form action="#" className="assignment-editor" style={{ maxWidth: "600px", margin: "0 auto" }}>
          
          {/* Assignment Name */}
          <label htmlFor="wd-name" className="mb-2"><b>Assignment Name</b></label>
          <br />
          <input id="wd-name" className="form-control" defaultValue={assignment.title} />
          <br />

          {/* Description */}
          <textarea id="wd-description" rows={10} className="form-control" defaultValue={assignment.description}></textarea>
          <br />

          {/* Main Details Table */}
          <table className="table">
              <tbody>
                  {/* Points */}
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-points">Points</label></td>
                      <td><input id="wd-points" type="number" className="form-control" defaultValue={assignment.points} /></td>
                  </tr>
                  
                  {/* Assignment Group (FIXED) */}
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-group">Assignment Group</label></td>
                      <td>
                          {/* FIX: Set defaultValue on the <select> tag */}
                          <select id="wd-group" className="form-control" defaultValue={assignment.group_name || 'ASSIGNMENTS'}>
                              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                              <option value="QUIZZES">QUIZZES</option>
                              <option value="EXAMS">EXAMS</option>
                          </select>
                      </td>
                  </tr>
                  
                  {/* Display Grade as (FIXED - using defaultValue) */}
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-display-grade-as">Display Grade as</label></td>
                      <td>
                          <select id="wd-display-grade-as" className="form-control" defaultValue="Percentage">
                              <option value="Percentage">Percentage</option>
                              <option value="Points">Points</option>
                          </select>
                      </td>
                  </tr>
                  
                  {/* Submission Type (FIXED - using defaultValue) */}
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-submission-type">Submission Type</label></td>
                      <td className="border p-3">
                          <select id="wd-select-submission-type" className="form-select" defaultValue={assignment.submission_type || 'Online'}>
                              <option value="ONLINE">Online</option>
                              <option value="IN_PERSON">In-person</option>
                              <option value="No Submission">No Submission</option>
                          </select>
                          <p></p>
                          {/* Checkbox options remain static */}
                          <div id="wd-online-options">
                              <label>Online Entry Options:</label><br />
                              <div className="form-check"><input type="checkbox" id="wd-chkbox-text" className="form-check-input" /><label htmlFor="wd-chkbox-text" className="form-check-label"> Text Entry</label></div>
                              <div className="form-check"><input type="checkbox" id="wd-chkbox-website" className="form-check-input" /><label htmlFor="wd-chkbox-website" className="form-check-label"> Website URL</label></div>
                              <div className="form-check"><input type="checkbox" id="wd-chkbox-recordings" className="form-check-input" /><label htmlFor="wd-chkbox-recordings" className="form-check-label"> Media Recordings</label></div>
                              <div className="form-check"><input type="checkbox" id="wd-chkbox-annotations" className="form-check-input" /><label htmlFor="wd-chkbox-annotations" className="form-check-label"> Student Annotations</label></div>
                              <div className="form-check"><input type="checkbox" id="wd-chkbox-uploads" className="form-check-input" /><label htmlFor="wd-chkbox-uploads" className="form-check-label"> File Uploads</label></div>
                          </div>
                      </td>
                  </tr>
                  
                  {/* Assign / Dates */}
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-assign-to">Assign</label></td>
                      <td className="border p-3">
                          Assign to<br /><input id="wd-assign-to" className="form-control" defaultValue="Everyone" /><br />
                          Due<br />
                          <input id="wd-due-date" type="date" className="form-control" defaultValue={assignment.due_date} /><br />
                          
                          <table>
                              <tbody>
                                  <tr><td>Available from</td><td>Until</td></tr>
                                  <tr>
                                      <td><input id="wd-available-from" type="date" className="form-control" defaultValue={assignment.available_date} /></td>
                                      <td><input id="wd-available-until" type="date" className="form-control" defaultValue="" /></td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
                  
                  {/* Save/Cancel Buttons (FIXED: Using correct Next.js Link syntax) */}
                  <tr>
                      <td colSpan={2} align="right">
                          <div className="d-flex justify-content-end pt-3">
                              {/* CANCEL Button */}
                              <Link href={assignmentsPath} passHref>
                                  <button type="button" className="btn btn-secondary me-2" id="wd-cancel">Cancel</button>
                              </Link>
                              {/* SAVE Button */}
                              <Link href={assignmentsPath} passHref>
                                  <button type="submit" className="btn btn-danger" id="wd-save">Save</button>
                              </Link>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </form>
    </div>
  );
}