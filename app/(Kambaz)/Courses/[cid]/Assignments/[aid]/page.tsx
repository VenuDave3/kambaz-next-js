/* eslint-disable */
'use client';
import { useParams, useRouter } from 'next/navigation'; 
import Link from 'next/link';
// Import useState and useEffect to fetch data
import React, { useRef, useState, useEffect } from 'react'; 
import { FaEllipsisV } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { addAssignment, updateAssignment } from "../reducer";
// Import your new client
import * as client from "../client";

// ... (Interface is unchanged) ...
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

  // We no longer need to pull the full list from Redux
  // const { assignments } = useSelector((state: any) => state.assignmentReducer);
  
  // --- NEW: Local state for the assignment being edited ---
  const [assignment, setAssignment] = useState<Partial<Assignment>>({
    title: "New Assignment",
    description: "New Description",
    points: 100,
    due_date: "",
    available_date: "",
    until_date: "",
    group_name: "ASSIGNMENTS",
    submission_type: "Online",
    // ... other defaults
  });
  // --- END NEW ---
  
  // --- NEW: Fetch the assignment if we are editing ---
  const fetchAssignment = async () => {
    if (aid !== "New") {
      try {
        const fetchedAssignment = await client.findAssignmentById(aid as string);
        setAssignment(fetchedAssignment);
      } catch (err) {
        console.error("Failed to fetch assignment:", err);
      }
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [aid]);
  // --- END NEW ---

  // We no longer need refs, we can use controlled components with our state
  // const nameRef = useRef<HTMLInputElement>(null);
  // ... all other refs ...

  // --- NEW: Handle form input changes ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    // Use the field's 'id' to update the correct property in the state
    const fieldName = id.replace("wd-", "").replace(/-/g, "_"); // e.g., "wd-due-date" -> "due_date"
    setAssignment({
      ...assignment,
      [fieldName]: value,
    });
  };
  // --- END NEW ---

  // --- UPDATED: handleSave ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // The 'assignment' object from our state is the data
    const assignmentToSave = { ...assignment, course: cid };

    try {
      if (aid === "New") {
        const newAssignment = await client.createAssignment(cid as string, assignmentToSave);
        dispatch(addAssignment(newAssignment));
      } else {
        await client.updateAssignment(assignmentToSave);
        dispatch(updateAssignment(assignmentToSave));
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Failed to save assignment:", err);
    }
  };
  // --- END UPDATE ---

  // ... (handleCancel is unchanged) ...
  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/Courses/${cid}/Assignments`);
  };

  // Helper to format date for input[type="date"]
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split('T')[0];
  };


  return (
    <div id="wd-assignments-editor" className="p-3">
      
      {/* ... (Header is unchanged) ... */}
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
          {/* --- UPDATED: All fields use 'value' and 'onChange' --- */}
          <input 
            id="wd-name" 
            className="form-control" 
            value={assignment.title || ""}
            onChange={handleInputChange}
          />
          <br />

          <textarea 
            id="wd-description" 
            rows={10} 
            className="form-control" 
            value={assignment.description || ""}
            onChange={handleInputChange}
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
                          value={assignment.points || 100}
                          onChange={handleInputChange}
                        />
                      </td>
                  </tr>
                  
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-group">Assignment Group</label></td>
                      <td>
                          <select 
                            id="wd-group" 
                            className="form-control" 
                            value={assignment.group_name || 'ASSIGNMENTS'}
                            onChange={handleInputChange}
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
                            value={assignment.display_grade_as || "Percentage"}
                            onChange={handleInputChange}
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
                            id="wd-submission-type" 
                            className="form-select" 
                            value={assignment.submission_type || 'Online'}
                            onChange={handleInputChange}
                          >
                              <option value="Online">Online</option>
                              <option value="In-person">In-person</option>
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
                            value={formatDate(assignment.due_date)}
                            onChange={handleInputChange}
                          /><br />
                          
                          <table>
                              <tbody>
                                  <tr><td>Available from</td><td>Until</td></tr>
                                  <tr>
                                      <td>
                                        <input 
                                          id="wd-available-date" 
                                          type="date" 
                                          className="form-control" 
                                          value={formatDate(assignment.available_date)}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td>
                                        <input 
                                          id="wd-until-date" 
                                          type="date" 
                                          className="form-control" 
                                          value={formatDate(assignment.until_date)}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </td>
                  </tr>
                  
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