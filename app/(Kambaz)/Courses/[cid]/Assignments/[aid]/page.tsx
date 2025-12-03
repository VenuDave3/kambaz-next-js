/* eslint-disable */
'use client';
import { useParams, useRouter } from 'next/navigation'; // 1. Import useRouter
import Link from 'next/link';
import React, { useRef } from 'react'; // 2. Import useRef
import { FaEllipsisV } from "react-icons/fa";

// --- REDUX IMPORTS ---
import { useSelector, useDispatch } from 'react-redux';
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store"; // 🛑 NEW: Import RootState
// --- END NEW IMPORTS ---

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

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const router = useRouter(); 
  const dispatch = useDispatch();

  // 🛑 MODIFICATION 1: Get currentUser and check role
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer as { currentUser: { role?: string, _id?: string } | null }
  );

  const isFaculty = currentUser?.role === "FACULTY";

  // 🛑 MODIFICATION 2: Redirect non-faculty immediately
  if (!isFaculty) {
    // Redirect students/unauthenticated users back to the read-only list
    router.push(`/Courses/${cid}/Assignments`);
    return null; // Return null to prevent rendering the editor UI
  }
  
  // 6. Find the assignment to edit. 'New' is the keyword.
  const assignment = aid !== "New" ? assignments.find((a: any) => a._id === aid) : null;
  
  // 7. Create refs for ALL form fields (like your friend's code)
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLSelectElement>(null);
  const gradeAsRef = useRef<HTMLSelectElement>(null);
  const submissionTypeRef = useRef<HTMLSelectElement>(null);
  const dueRef = useRef<HTMLInputElement>(null);
  const availableFromRef = useRef<HTMLInputElement>(null);
  const availableUntilRef = useRef<HTMLInputElement>(null);

  // 8. This handles the Save button
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // Collect all data from refs
    const newAssignmentData = {
      _id: aid === "New" ? new Date().getTime().toString() : aid,
      title: nameRef.current?.value,
      description: descriptionRef.current?.value,
      points: pointsRef.current?.value,
      group_name: groupRef.current?.value,
      due_date: dueRef.current?.value,
      available_date: availableFromRef.current?.value,
      until_date: availableUntilRef.current?.value,
      course: cid,
    };

    // Dispatch the correct action
    if (aid === "New") {
      dispatch(addAssignment(newAssignmentData));
    } else {
      dispatch(updateAssignment(newAssignmentData));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  // 9. This handles the Cancel button
  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      
      {/* Header and Controls (Your layout is unchanged) */}
      <div className="d-flex justify-content-end align-items-center mb-4">
        <div className="text-success fw-bold me-3">Published</div>
        <button type="button" className="btn btn-secondary me-2">
          <FaEllipsisV />
        </button>
      </div>
      <hr />

      <form onSubmit={handleSave} className="assignment-editor" style={{ maxWidth: "600px", margin: "0 auto" }}>
          
          <label htmlFor="wd-name" className="mb-2"><b>Assignment Name</b></label>
          <br />
          <input 
            id="wd-name" 
            className="form-control" 
            defaultValue={assignment ? assignment.title : "New Assignment"}
            ref={nameRef}
          />
          <br />

          <textarea 
            id="wd-description" 
            rows={10} 
            className="form-control" 
            defaultValue={assignment ? assignment.description : "New Description"}
            ref={descriptionRef}
          ></textarea>
          <br />

          <table className="table">
              <tbody>
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-points">Points</label></td>
                      <td>
                        <input 
                          id="wd-points" 
                          type="number" 
                          className="form-control" 
                          defaultValue={assignment ? assignment.points : 100}
                          ref={pointsRef}
                        />
                      </td>
                  </tr>
                  
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-group">Assignment Group</label></td>
                      <td>
                          <select 
                            id="wd-group" 
                            className="form-control" 
                            defaultValue={assignment ? assignment.group_name : 'ASSIGNMENTS'}
                            ref={groupRef}
                          >
                              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                              <option value="QUIZZES">QUIZZES</option>
                              <option value="EXAMS">EXAMS</option>
                          </select>
                      </td>
                  </tr>
                  
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-display-grade-as">Display Grade as</label></td>
                      <td>
                          <select 
                            id="wd-display-grade-as" 
                            className="form-control" 
                            defaultValue={assignment ? assignment.display_grade_as : "Percentage"}
                            ref={gradeAsRef}
                          >
                              <option value="Percentage">Percentage</option>
                              <option value="Points">Points</option>
                          </select>
                      </td>
                  </tr>
                  
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-submission-type">Submission Type</label></td>
                      <td className="border p-3">
                          <select 
                            id="wd-select-submission-type" 
                            className="form-select" 
                            defaultValue={assignment ? assignment.submission_type : 'Online'}
                            ref={submissionTypeRef}
                          >
                              <option value="ONLINE">Online</option>
                              <option value="IN_PERSON">In-person</option>
                              <option value="No Submission">No Submission</option>
                          </select>
                          <p></p>
                          {/* ... (Checkboxes are unchanged) ... */}
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
                  
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-assign-to">Assign</label></td>
                      <td className="border p-3">
                          Assign to<br /><input id="wd-assign-to" className="form-control" defaultValue="Everyone" /><br />
                          Due<br />
                          <input 
                            id="wd-due-date" 
                            type="date" 
                            className="form-control" 
                            defaultValue={assignment ? assignment.due_date : ""}
                            ref={dueRef}
                          /><br />
                          
                          <table>
                              <tbody>
                                  <tr><td>Available from</td><td>Until</td></tr>
                                  <tr>
                                      <td>
                                        <input 
                                          id="wd-available-from" 
                                          type="date" 
                                          className="form-control" 
                                          defaultValue={assignment ? assignment.available_date : ""}
                                          ref={availableFromRef}
                                        />
                                      </td>
                                      <td>
                                        <input 
                                          id="wd-available-until" 
                                          type="date" 
                                          className="form-control" 
                                          defaultValue={assignment ? assignment.until_date : ""}
                                          ref={availableUntilRef}
                                        />
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
                  
                  {/* Save/Cancel buttons */}
                  <tr>
                      <td colSpan={2} align="right">
                          <div className="d-flex justify-content-end pt-3">
                              <button type="button" className="btn btn-secondary me-2" id="wd-cancel" onClick={handleCancel}>
                                Cancel
                              </button>
                              <button type="submit" className="btn btn-danger" id="wd-save">
                                Save
                              </button>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </form>
    </div>
  );
}