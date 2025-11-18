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
import { useState, useEffect } from "react"; // 2. ADD useState and useEffect

// --- REDUX & CLIENT IMPORTS ---
import { useSelector, useDispatch } from "react-redux";
// 3. Import reducer functions (deleteAssignment, setAssignments)
import { deleteAssignment, setAssignments } from "./reducer"; 
// 4. Import all client API calls from the local client file
import * as client from "./client"; 
// --- END IMPORTS ---


// Interface (Unchanged)
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

  // 5. Get assignments from Redux store (using "cheat")
  const { assignments } = useSelector((state: any) => state.assignmentReducer);

  const [showDelete, setShowDelete] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  // --- NEW ASYNC DATA FETCHING (from 5.3.6) ---
  const fetchAssignments = async () => {
    if (!cid) return;
    try {
      // 6. Call the client to get assignments for *this* course
      const assignments = await client.findAssignmentsForCourse(cid as string);
      // 7. Load the assignments from the server into the Redux store
      dispatch(setAssignments(assignments));
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  };
  
  useEffect(() => {
    fetchAssignments();
  }, [cid]); // Re-fetch if the course ID changes
  // --- END NEW ASYNC DATA FETCHING ---

  // 8. We remove the local filter because the server sent the correct data
  // const courseAssignments = (assignments as Assignment[]).filter(...)
  const assignmentGroups = groupAssignments(assignments as Assignment[]);
  
  // modal handler functions (handleAskDelete and handleCancelDelete are unchanged)
  const handleAskDelete = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDelete(true);
  };
  const handleCancelDelete = () => {
    setShowDelete(false);
    setAssignmentToDelete(null);
  };
  
  // 9. UPDATE DELETE HANDLER (from 5.3.6)
  const handleConfirmDelete = async () => {
    if (assignmentToDelete?._id) {
      try {
        // Call the API to delete
        await client.deleteAssignment(assignmentToDelete._id);
        // Update Redux state immediately
        dispatch(deleteAssignment(assignmentToDelete._id));
      } catch (err) {
        console.error("Failed to delete assignment:", err);
      }
    }
    setShowDelete(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="p-3">
      <div className="wd-assignments-container mx-auto">
        
        {/* Toolbar (All controls are already in this file) */}
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
                          <Link
                            href={`/Courses/${cid}/Assignments/${assignment._id}`} 
                            className="wd-assignment-title text-decoration-none text-dark"
                          >
                            {assignment.title}
                          </Link>
                          {/* ... (rest of assignment details are unchanged) ... */}
                        </div>

                        <div className="wd-assign-right-controls text-muted">
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

      {/* Modal (Unchanged) */}
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