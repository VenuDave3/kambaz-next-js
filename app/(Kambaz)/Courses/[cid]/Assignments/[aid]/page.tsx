/* eslint-disable */
'use client';
import { useParams, useRouter } from 'next/navigation'; 
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react'; 
import { FaEllipsisV } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { addAssignment, updateAssignment } from "../reducer";
import * as client from "../client";
import { FaCheck } from "react-icons/fa"; // Added Check icon for visual consistency

// Assuming your server uses snake_case based on your local state:
// e.g., { ..., title: "Title", due_date: "2025-01-01", ... }
interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    due_date: string;       // Assumed snake_case property from server/state
    available_date: string; // Assumed snake_case property from server/state
    until_date: string;     // Assumed snake_case property from server/state
    assignment_type: string;
    submission_type: string;
    group_name: string;
    [key: string]: any;
}

// Helper to format date for input[type="date"]
const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    // If the date string contains a time component, take only the date part
    // Otherwise, try to parse and format it
    try {
        if (dateString.includes('T')) {
            return dateString.split('T')[0];
        }
        return new Date(dateString).toISOString().split('T')[0];
    } catch {
        return dateString; // Return original if parsing fails
    }
};


export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const router = useRouter();
  const dispatch = useDispatch();

  // --- Local state for the assignment being edited ---
  const [assignment, setAssignment] = useState<Partial<Assignment>>({
    title: "New Assignment",
    description: "New Description",
    points: 100,
    due_date: "",
    available_date: "",
    until_date: "",
    group_name: "ASSIGNMENTS",
    submission_type: "Online",
  });
  // --- END Local State ---
  
  // --- NEW/FIXED: Fetch the assignment if we are editing ---
  const fetchAssignment = async () => {
    // Note: Your application uses "New" for creating, "aid" (ID string) for editing
    if (aid !== "New") {
      try {
        const fetchedAssignment = await client.findAssignmentById(aid as string);
        // Load the fetched data into the local state
        setAssignment(fetchedAssignment);
      } catch (err) {
        console.error("Failed to fetch assignment:", err);
        // Handle scenario where assignment might not be found (e.g., deleted)
        // router.push(`/Courses/${cid}/Assignments`);
      }
    }
  };

  useEffect(() => {
    // Only fetch if we are editing an existing assignment
    if (aid !== "New") {
        fetchAssignment();
    } else {
        // Reset/initialize state for a brand new assignment
        setAssignment({
            title: "New Assignment",
            description: "New Description",
            points: 100,
            due_date: "",
            available_date: "",
            until_date: "",
            group_name: "ASSIGNMENTS",
            submission_type: "Online",
            course: cid as string, // Ensure new assignment knows its course
        });
    }
  }, [aid, cid]);
  // --- END NEW/FIXED Fetch ---

  // --- UPDATED: Handle form input changes ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    // Maps: "wd-name" -> "title", "wd-due-date" -> "due_date", etc.
    let fieldName: keyof Assignment = id.replace("wd-", "").replace(/-/g, "_") as keyof Assignment;
    
    // Explicitly handle title name if needed (though wd-name -> name might be intended)
    if (fieldName === 'name') {
        fieldName = 'title';
    }

    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [fieldName]: value,
    }));
  };
  // --- END UPDATED Input Handler ---

  // --- FIXED: handleSave ---
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // 🚀 FIX: The object we save IS the local state, ensuring ALL changes are sent.
    const assignmentToSave = { ...assignment, course: cid as string, _id: aid as string };

    try {
      if (aid === "New") {
        // C - CREATE
        const newAssignment = await client.createAssignment(cid as string, assignmentToSave);
        // Note: Using a Redux array function like 'addAssignment' is generally better 
        // than replacing the whole list with 'setAssignments'.
        dispatch(addAssignment(newAssignment));
      } else {
        // U - UPDATE
        // Send the complete updated object from the state
        await client.updateAssignment(assignmentToSave);
        
        // Update Redux state with the new local object
        dispatch(updateAssignment(assignmentToSave as Assignment)); 
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Failed to save assignment:", err);
      // Optional: Add state to show an error message in the UI
    }
  };
  // --- END FIXED Save ---

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      
      {/* ... (Header) ... */}
      <div className="d-flex justify-content-end align-items-center mb-4">
        <div className="text-success fw-bold me-3"><FaCheck className="me-1 text-success" /> Published</div>
        <button type="button" className="btn btn-secondary me-2">
          <FaEllipsisV />
        </button>
      </div>
      <hr />

      <form onSubmit={handleSave} className="assignment-editor" style={{ maxWidth: "600px", margin: "0 auto" }}>
          
          <label htmlFor="wd-name" className="mb-2"><b>Assignment Name</b></label>
          <br />
          {/* --- FIXED: Input bindings use the local state --- */}
          <input 
            id="wd-name" 
            className="form-control" 
            // Use local state, ensuring it defaults to '' if null/undefined
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
                          // Convert number to string for value attribute
                          value={String(assignment.points ?? 100)} 
                          onChange={handleInputChange}
                        />
                      </td>
                  </tr>
                  
                  <tr>
                      <td align="right" valign="top"><label htmlFor="wd-group-name">Assignment Group</label></td>
                      <td>
                          {/* Note: I changed ID from 'wd-group' to 'wd-group-name' 
                             to better match wd-X-Y naming scheme if your server expects 'group_name' */}
                          <select 
                            id="wd-group-name" 
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
                  
                  {/* ... (Other form fields left as is, assuming their IDs align with state) ... */}
                  
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
                          {/* Date fields use snake_case state: due_date */}
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
                                        {/* Date fields use snake_case state: available_date */}
                                        <input 
                                          id="wd-available-date" 
                                          type="date" 
                                          className="form-control" 
                                          value={formatDate(assignment.available_date)}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td>
                                        {/* Date fields use snake_case state: until_date */}
                                        <input 
                                          id="wd-wd-until-date" // Changed to match pattern
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