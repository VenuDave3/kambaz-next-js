/* eslint-disable */
'use client';
import Link from 'next/link';
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Badge,
  Modal, 
} from 'react-bootstrap';
import { IoSearchOutline, IoEllipsisVertical } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useParams } from "next/navigation";
import { useState } from "react";

// --- REDUX IMPORTS ---
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer"; 
import { RootState } from "../../../store"; 
// --- END REDUX IMPORTS ---


// Interface to type the assignment data
interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    due_date: string;
    available_date: string;
    group_name: string;
}

// Group the assignments by group_name for rendering (Unchanged)
const groupAssignments = (assignments: Assignment[]) => {
    return assignments.reduce((groups, assignment) => {
        const group = assignment.group_name || 'Assignments';
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(assignment);
        return groups;
    }, {} as Record<string, Assignment[]>);
};


export default function AssignmentsPage() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  // 🛑 FIX 1: Use type assertion for currentUser
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer as { currentUser: { role?: string, _id?: string } | null }
  );

  // 🛑 NEW: Check for Faculty role
  const isFaculty = currentUser?.role === "FACULTY";

  // Add state for the delete modal
  const [showDelete, setShowDelete] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  // Filter the Redux list
  const courseAssignments = (assignments as Assignment[]).filter(
    (assignment) => assignment.course === cid
  );

  // Group the filtered assignments
  const assignmentGroups = groupAssignments(courseAssignments);
  
  // modal handler functions
  const handleAskDelete = (assignment: any) => {
    // 🛑 Restriction check here
    if (!isFaculty) return; 
    setAssignmentToDelete(assignment);
    setShowDelete(true);
  };
  const handleCancelDelete = () => {
    setShowDelete(false);
    setAssignmentToDelete(null);
  };
  const handleConfirmDelete = () => {
    if (assignmentToDelete?._id) {
      dispatch(deleteAssignment(assignmentToDelete._id));
    }
    setShowDelete(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      <div className="wd-assignments-container mx-auto">
        
        {/* Toolbar */}
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          {/* ... search bar ... */}
          <div style={{ maxWidth: 420 }} className="flex-grow-1">
            <InputGroup>
              <InputGroup.Text>
                <IoSearchOutline className="fs-6" />
              </InputGroup.Text>
              <FormControl id="wd-assignments-search" placeholder="Search for Assignment" />
            </InputGroup>
          </div>
          
          {/* 🛑 MODIFICATION 2: Hide creation buttons from Students */}
          {isFaculty && (
            <div className="d-flex align-items-center gap-2">
              <Button id="wd-add-group-btn" variant="secondary" size="lg"> <FaPlus className="me-2" /> Group </Button>
              
              {/* Link to editor page */}
              <Link href={`/Courses/${cid}/Assignments/New`}
                id="wd-add-assignment-btn" 
                className="btn btn-danger btn-lg">
                <FaPlus className="me-2" /> Assignment 
              </Link>
              
              <Button variant="light" size="lg" className="border"> <IoEllipsisVertical /> </Button>
            </div>
          )}
        </div>

        {/* Dynamic Assignment Groups */}
        <ListGroup className="rounded-0">
          {Object.keys(assignmentGroups).map((groupName) => {
            const groupList = assignmentGroups[groupName];
            return (
              <ListGroupItem 
                key={groupName} 
                className="p-0 mb-4 fs-5 border-gray wd-assignments-group"
              >
                {/* Group Header Bar */}
                <div className="group-header p-3 ps-2 bg-secondary d-flex align-items-center">
                  {isFaculty && <BsGripVertical className="me-2 fs-3" />} {/* Grip icon only for faculty */}
                  <span className="fw-semibold text-uppercase">{groupName}</span>
                  
                  {/* 🛑 MODIFICATION 3: Group Header Controls (Plus/Ellipsis) only for Faculty */}
                  {isFaculty ? (
                    <div className="ms-auto d-flex align-items-center gap-2">
                        {groupName === 'Assignments' && ( 
                          <Badge bg="light" text="dark" className="px-3 py-2 fw-normal">
                            40% of Total
                          </Badge>
                        )}
                        <Button variant="light" size="sm" className="border"> <FaPlus /> </Button>
                        <Button variant="light" size="sm" className="border"> <IoEllipsisVertical /> </Button>
                    </div>
                  ) : (
                    // Students only see the badge
                    groupName === 'Assignments' && ( 
                      <Badge bg="light" text="dark" className="px-3 py-2 fw-normal ms-auto">
                        40% of Total
                      </Badge>
                    )
                  )}
                </div>

                {/* Assignment Items within the group */}
                <ListGroup className="rounded-0">
                  {groupList.map((assignment) => (
                    <ListGroupItem key={assignment._id} className="wd-assignment p-3 ps-2">
                      <div className="d-flex align-items-start gap-2">
                        {isFaculty && <BsGripVertical className="fs-4 mt-1" />} {/* Grip only for faculty */}
                        
                        <div className="mt-1">
                          <HiOutlineDocumentText className="text-success fs-4" />
                        </div>
                        <div className="flex-fill">
                          {/* 🛑 MODIFICATION 4: Link destination based on role */}
                          <Link
                            // Faculty links to editor, Students link to view (currently '#')
                            href={isFaculty ? `/Courses/${cid}/Assignments/${assignment._id}` : `#`} 
                            className="wd-assignment-title text-decoration-none text-dark"
                          >
                            {assignment.title}
                          </Link>
                          {/* ... assignment details ... */}
                          <div className="wd-assignment-line1">
                            <span className="wd-assign-type">Multiple Modules</span>
                            <span className="mx-2 text-muted">|</span>
                            <span className="wd-assign-availability text-muted">
                              <span className="label">Not available until</span> {assignment.available_date}
                            </span>
                          </div>

                          <div className="wd-assignment-line2 text-muted">
                            <span className="wd-assign-due">
                              <span className="label">Due</span> {assignment.due_date}
                            </span>
                            <span className="mx-2">|</span>
                            <span>{assignment.points} pts</span>
                          </div>
                        </div>

                        {/* 🛑 MODIFICATION 5: Only show action icons (trash/ellipsis) to Faculty */}
                        {isFaculty && (
                          <div className="wd-assign-right-controls text-muted">
                            <FaTrash 
                              className="text-danger me-2" 
                              style={{ cursor: "pointer" }}
                              onClick={() => handleAskDelete(assignment)} 
                            />
                            <FaCheckCircle className="text-success me-2" />
                            <IoEllipsisVertical className="fs-5" />
                          </div>
                        )}
                        {/* Students will only see the assignment details (read-only) */}
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>

      {/* The delete modal is still here, but handleAskDelete prevents non-faculty from triggering it. */}
      <Modal show={showDelete} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {assignmentToDelete ? (
            <>
              Are you sure you want to delete{" "}
              <strong>{assignmentToDelete.title}</strong>?
            </>
          ) : (
            "Are you sure you want to delete this assignment?"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}