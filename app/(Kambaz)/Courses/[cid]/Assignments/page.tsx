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
  Modal, // 1. Import Modal
} from 'react-bootstrap';
import { IoSearchOutline, IoEllipsisVertical } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useParams } from "next/navigation";
import { useState } from "react"; // 2. Import useState

// --- NEW REDUX IMPORTS ---
import { useSelector, useDispatch } from "react-redux";
// 3. Use the textbook's path (as you requested)
import { deleteAssignment } from "./reducer"; 
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

  // --- THIS IS THE FIX ---
  // Removed the 's'. It's now 'assignmentReducer' to match your store.
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  // --- END FIX ---

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
          
          <div className="d-flex align-items-center gap-2">
            <Button id="wd-add-group-btn" variant="secondary" size="lg"> <FaPlus className="me-2" /> Group </Button>
            
            {/* This is the link to the editor page (for 4.4.5.2) */}
            <Link href={`/Courses/${cid}/Assignments/New`}
              id="wd-add-assignment-btn" 
              className="btn btn-danger btn-lg">
              <FaPlus className="me-2" /> Assignment 
            </Link>
            
            <Button variant="light" size="lg" className="border"> <IoEllipsisVertical /> </Button>
          </div>
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
                {/* ... (Group Header Bar is unchanged) ... */}
                <div className="group-header p-3 ps-2 bg-secondary d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <span className="fw-semibold text-uppercase">{groupName}</span>
                  {/* ... (rest of header is unchanged) ... */}
                  <div className="ms-auto d-flex align-items-center gap-2">
                    {groupName === 'Assignments' && ( 
                      <Badge bg="light" text="dark" className="px-3 py-2 fw-normal">
                        40% of Total
                      </Badge>
                    )}
                    <Button variant="light" size="sm" className="border"> <FaPlus /> </Button>
                    <Button variant="light" size="sm" className="border"> <IoEllipsisVertical /> </Button>
                  </div>
                </div>

                {/* Assignment Items within the group */}
                <ListGroup className="rounded-0">
                  {groupList.map((assignment) => (
                    <ListGroupItem key={assignment._id} className="wd-assignment p-3 ps-2">
                      <div className="d-flex align-items-start gap-2">
                        <BsGripVertical className="fs-4 mt-1" />
                        <div className="mt-1">
                          <HiOutlineDocumentText className="text-success fs-4" />
                        </div>
                        <div className="flex-fill">
                          {/* This is the link to the editor page (for 4.4.5.3) */}
                          <Link
                            href={`/Courses/${cid}/Assignments/${assignment._id}`} 
                            className="wd-assignment-title text-decoration-none text-dark"
                          >
                            {assignment.title}
                          </Link>
                          {/* ... (rest of assignment details are unchanged) ... */}
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

                        <div className="wd-assign-right-controls text-muted">
                          {/* This is the delete button (for 4.4.5.4) */}
                          <FaTrash 
                            className="text-danger me-2" 
                            style={{ cursor: "pointer" }}
                            onClick={() => handleAskDelete(assignment)} 
                          />
                          <FaCheckCircle className="text-success me-2" />
                          <IoEllipsisVertical className="fs-5" />
                        </div>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>

      {/* This is the modal for the delete button */}
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