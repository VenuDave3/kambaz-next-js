/* eslint-disable */
'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { FaEllipsisV } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { addAssignment, updateAssignment } from "../reducer";
import * as client from "../client";
import { FaCheck } from "react-icons/fa";
import { RootState } from "../../../../store";


interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    due_date: string;
    available_date: string;
    until_date: string;
    assignment_type: string;
    submission_type: string;
    group_name: string;
    [key: string]: any;
}

const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    try {
        if (dateString.includes('T')) {
            return dateString.split('T')[0];
        }
        return new Date(dateString).toISOString().split('T')[0];
    } catch {
        return dateString;
    }
};


export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer as { currentUser: { role?: string, _id?: string } | null }
  );

  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (currentUser && currentUser.role !== "FACULTY") {
      router.push(`/Courses/${cid}/Assignments`);
    }
  }, [currentUser, cid, router]);

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
    if (aid !== "New") {
        fetchAssignment();
    } else {
        setAssignment({
            title: "New Assignment",
            description: "New Description",
            points: 100,
            due_date: "",
            available_date: "",
            until_date: "",
            group_name: "ASSIGNMENTS",
            submission_type: "Online",
            course: cid as string,
        });
    }
  }, [aid, cid]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let fieldName: keyof Assignment = id.replace("wd-", "").replace(/-/g, "_") as keyof Assignment;

    if (fieldName === 'name') {
        fieldName = 'title';
    }

    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [fieldName]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFaculty) return;

    const assignmentToSave = { ...assignment, course: cid as string, _id: aid as string };

    try {
      if (aid === "New") {
        const newAssignment = await client.createAssignment(cid as string, assignmentToSave);
        dispatch(addAssignment(newAssignment));
        router.push(`/Courses/${cid}/Assignments/${newAssignment._id}`);
      } else {
        await client.updateAssignment(assignmentToSave);
        dispatch(updateAssignment(assignmentToSave as Assignment));
        router.push(`/Courses/${cid}/Assignments`);
      }
    } catch (err) {
      console.error("Failed to save assignment:", err);
    }
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">

      {isFaculty ? (
        <>
          <div className="d-flex justify-content-end align-items-center mb-4">
            <div className="me-3">
              <FaCheck className="text-success me-2" />
              Published
            </div>
            <button type="button" className="btn btn-secondary me-2">
              <FaEllipsisV />
            </button>
            <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger btn-lg">
              Cancel
            </Link>
            <button type="submit" onClick={handleSave} className="btn btn-success btn-lg ms-2">
              Save
            </button>
          </div>
          <hr />

          <form onSubmit={handleSave} className="assignment-editor" style={{ maxWidth: "600px", margin: "0 auto" }}>

              <label htmlFor="wd-name" className="mb-2"><b>Assignment Name</b></label>
              <br />
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
                              value={String(assignment.points ?? 100)}
                              onChange={handleInputChange}
                            />
                          </td>
                      </tr>

                      <tr>
                          <td align="right" valign="top"><label htmlFor="wd-group-name">Assignment Group</label></td>
                          <td>
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
                                              id="wd-wd-until-date"
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
        </>
      ) : (
        <div className="alert alert-danger" role="alert">
          Access Denied. You do not have permission to view the Assignment Editor.
        </div>
      )}
    </div>
  );
}