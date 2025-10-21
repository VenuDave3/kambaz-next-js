'use client';
import Link from 'next/link';
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'react-bootstrap';
import { IoSearchOutline, IoEllipsisVertical } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa6';
import { FaCheckCircle } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useParams } from "next/navigation";
import { assignments } from "../../../Database"; 


// Interface to type the assignment data (based on your JSON fields)
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

// Group the assignments by group_name for rendering
const groupAssignments = (assignments: Assignment[]) => {
    return assignments.reduce((groups, assignment) => {
        const group = assignment.group_name || 'Assignments'; // Default group
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(assignment);
        return groups;
    }, {} as Record<string, Assignment[]>);
};


export default function AssignmentsPage() {
  const { cid } = useParams(); // Get current Course ID

  // 1. Filter the global list to get only assignments for the current course
  const courseAssignments = (assignments as Assignment[]).filter(
    (assignment) => assignment.course === cid
  );

  // 2. Group the filtered assignments (e.g., into 'Quizzes', 'Exams', 'Projects')
  const assignmentGroups = groupAssignments(courseAssignments);

  return (
    <div id="wd-assignments" className="p-3">
      <div className="wd-assignments-container mx-auto">
        
        {/* Toolbar (Static, remains the same) */}
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          {/* search (left) */}
          <div style={{ maxWidth: 420 }} className="flex-grow-1">
            <InputGroup>
              <InputGroup.Text>
                <IoSearchOutline className="fs-6" />
              </InputGroup.Text>
              <FormControl id="wd-assignments-search" placeholder="Search for Assignment" />
            </InputGroup>
          </div>
          {/* actions (right) */}
          <div className="d-flex align-items-center gap-2">
            <Button id="wd-add-group-btn" variant="secondary" size="lg"> <FaPlus className="me-2" /> Group </Button>
            <Button id="wd-add-assignment-btn" variant="danger" size="lg"> <FaPlus className="me-2" /> Assignment </Button>
            <Button variant="light" size="lg" className="border"> <IoEllipsisVertical /> </Button>
          </div>
        </div>

        {/* Dynamic Assignment Groups */}
        <ListGroup className="rounded-0">
          
          {/* MAP OVER THE DYNAMIC GROUPS */}
          {Object.keys(assignmentGroups).map((groupName) => {
            const groupList = assignmentGroups[groupName];
            return (
              <ListGroupItem 
                key={groupName} 
                className="p-0 mb-4 fs-5 border-gray wd-assignments-group"
              >
                {/* Group Header Bar - Using dynamic groupName */}
                <div className="group-header p-3 ps-2 bg-secondary d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <span className="fw-semibold text-uppercase">{groupName}</span>

                  <div className="ms-auto d-flex align-items-center gap-2">
                    {/* Only show badge for the main group (optional logic) */}
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
                  {/* MAP OVER ASSIGNMENTS WITHIN THE CURRENT GROUP */}
                  {groupList.map((assignment) => (
                    <ListGroupItem key={assignment._id} className="wd-assignment p-3 ps-2">
                      <div className="d-flex align-items-start gap-2">
                        <BsGripVertical className="fs-4 mt-1" />
                        <div className="mt-1">
                          <HiOutlineDocumentText className="text-success fs-4" />
                        </div>

                        <div className="flex-fill">
                          <Link
                            // DYNAMIC LINK: Encode both CID and Assignment ID (aid)
                            href={`/Courses/${cid}/Assignments/${assignment._id}`} 
                            className="wd-assignment-title text-decoration-none text-dark"
                          >
                            {assignment.title}
                          </Link>

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
    </div>
  );
}