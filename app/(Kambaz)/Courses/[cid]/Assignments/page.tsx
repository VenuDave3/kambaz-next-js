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
import { FaCheckCircle } from 'react-icons/fa'; // NOTE: from 'fa' set, not 'fa6'
import { BsGripVertical } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default function AssignmentsPage() {
  return (
    <div id="wd-assignments" className="p-3">
      {/* content width similar to Canvas */}
      <div className="wd-assignments-container mx-auto">
        {/* toolbar */}
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          {/* search (left) */}
          <div style={{ maxWidth: 420 }} className="flex-grow-1">
            <InputGroup>
              <InputGroup.Text>
                <IoSearchOutline className="fs-6" />
              </InputGroup.Text>
              <FormControl
                id="wd-assignments-search"
                placeholder="Search for Assignment"
              />
            </InputGroup>
          </div>

          {/* actions (right) */}
          <div className="d-flex align-items-center gap-2">
            <Button id="wd-add-group-btn" variant="secondary" size="lg">
              <FaPlus className="me-2" />
              Group
            </Button>
            <Button id="wd-add-assignment-btn" variant="danger" size="lg">
              <FaPlus className="me-2" />
              Assignment
            </Button>
          </div>
        </div>

        {/* GROUP: Assignments */}
        <ListGroup className="rounded-0">
          <ListGroupItem className="p-0 mb-4 fs-5 border-gray wd-assignments-group">
            {/* header bar */}
            <div className="group-header p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <span className="fw-semibold text-uppercase">Assignments</span>

              <div className="ms-auto d-flex align-items-center gap-2">
                <Badge bg="light" text="dark" className="px-3 py-2 fw-normal">
                  40% of Total
                </Badge>
                <Button variant="light" size="sm" className="border">
                  <FaPlus />
                </Button>
                <Button variant="light" size="sm" className="border">
                  <IoEllipsisVertical />
                </Button>
              </div>
            </div>

            {/* items */}
            <ListGroup className="rounded-0">
              {/* A1 */}
              <ListGroupItem className="wd-assignment p-3 ps-2">
                <div className="d-flex align-items-start gap-2">
                  <BsGripVertical className="fs-4 mt-1" />
                  <div className="mt-1">
                    <HiOutlineDocumentText className="text-success fs-4" />
                  </div>

                  <div className="flex-fill">
                    <Link
                      href="/Courses/1234/Assignments/A1"
                      className="wd-assignment-title text-decoration-none text-dark"
                    >
                      A1
                    </Link>

                    <div className="wd-assignment-line1">
                      <span className="wd-assign-type">Multiple Modules</span>
                      <span className="mx-2 text-muted">|</span>
                      <span className="wd-assign-availability text-muted">
                        <span className="label">Not available until</span> May 6 at 12:00am
                      </span>
                    </div>

                    <div className="wd-assignment-line2 text-muted">
                      <span className="wd-assign-due">
                        <span className="label">Due</span> May 13 at 11:59pm
                      </span>
                      <span className="mx-2">|</span>
                      <span>100 pts</span>
                    </div>
                  </div>

                  <div className="wd-assign-right-controls text-muted">
                    <FaCheckCircle className="text-success me-2" />
                    <IoEllipsisVertical className="fs-5" />
                  </div>
                </div>
              </ListGroupItem>

              {/* A2 */}
              <ListGroupItem className="wd-assignment p-3 ps-2">
                <div className="d-flex align-items-start gap-2">
                  <BsGripVertical className="fs-4 mt-1" />
                  <div className="mt-1">
                    <HiOutlineDocumentText className="text-success fs-4" />
                  </div>

                  <div className="flex-fill">
                    <Link
                      href="/Courses/1234/Assignments/A2"
                      className="wd-assignment-title text-decoration-none text-dark"
                    >
                      A2
                    </Link>

                    <div className="wd-assignment-line1">
                      <span className="wd-assign-type">Multiple Modules</span>
                      <span className="mx-2 text-muted">|</span>
                      <span className="wd-assign-availability text-muted">
                        <span className="label">Not available until</span> May 13 at 12:00am
                      </span>
                    </div>

                    <div className="wd-assignment-line2 text-muted">
                      <span className="wd-assign-due">
                        <span className="label">Due</span> May 23 at 11:59pm
                      </span>
                      <span className="mx-2">|</span>
                      <span>100 pts</span>
                    </div>
                  </div>

                  <div className="wd-assign-right-controls text-muted">
                    <FaCheckCircle className="text-success me-2" />
                    <IoEllipsisVertical className="fs-5" />
                  </div>
                </div>
              </ListGroupItem>

              {/* A3 */}
              <ListGroupItem className="wd-assignment p-3 ps-2">
                <div className="d-flex align-items-start gap-2">
                  <BsGripVertical className="fs-4 mt-1" />
                  <div className="mt-1">
                    <HiOutlineDocumentText className="text-success fs-4" />
                  </div>

                  <div className="flex-fill">
                    <Link
                      href="/Courses/1234/Assignments/A3"
                      className="wd-assignment-title text-decoration-none text-dark"
                    >
                      A3
                    </Link>

                    <div className="wd-assignment-line1">
                      <span className="wd-assign-type">Multiple Modules</span>
                      <span className="mx-2 text-muted">|</span>
                      <span className="wd-assign-availability text-muted">
                        <span className="label">Not available until</span> May 20 at 12:00am
                      </span>
                    </div>

                    <div className="wd-assignment-line2 text-muted">
                      <span className="wd-assign-due">
                        <span className="label">Due</span> May 30 at 11:59pm
                      </span>
                      <span className="mx-2">|</span>
                      <span>100 pts</span>
                    </div>
                  </div>

                  <div className="wd-assign-right-controls text-muted">
                    <FaCheckCircle className="text-success me-2" />
                    <IoEllipsisVertical className="fs-5" />
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>

          {/* (Optional) GROUP: Quizzes */}
          <ListGroupItem className="p-0 mb-4 fs-5 border-gray wd-assignments-group">
            <div className="group-header p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <span className="fw-semibold text-uppercase">Quizzes</span>
              <div className="ms-auto d-flex align-items-center gap-2">
                <Button variant="light" size="sm" className="border">
                  <FaPlus />
                </Button>
                <Button variant="light" size="sm" className="border">
                  <IoEllipsisVertical />
                </Button>
              </div>
            </div>
            <ListGroup className="rounded-0">
              <ListGroupItem className="wd-assignment p-3 ps-2">
                <div className="d-flex align-items-start gap-2">
                  <BsGripVertical className="fs-4 mt-1" />
                  <div className="mt-1">
                    <HiOutlineDocumentText className="text-success fs-4" />
                  </div>
                  <div className="flex-fill">
                    <Link
                      href="/Courses/1234/Assignments/Q1"
                      className="wd-assignment-title text-decoration-none text-dark"
                    >
                      Q1 – Basics
                    </Link>
                    <div className="wd-assignment-line2 text-muted">
                      <span className="wd-assign-due">
                        <span className="label">Due</span> Fri Sep 20 at 11:59pm
                      </span>
                      <span className="mx-2">|</span>
                      <span>20 pts</span>
                    </div>
                  </div>
                  <div className="wd-assign-right-controls text-muted">
                    <FaCheckCircle className="text-success me-2" />
                    <IoEllipsisVertical className="fs-5" />
                  </div>
                </div>
              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}
