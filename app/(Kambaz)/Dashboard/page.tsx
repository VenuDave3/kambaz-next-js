/* eslint-disable */
"use client";
import { useState } from "react";
import Link from "next/link";
// --- REDUX IMPORTS ---
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/coursesReducer"; 
// --- END REDUX IMPORTS ---
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
// --- NEW IMPORT ---
import * as db from "../Database"; 
// --- END NEW IMPORT ---

const INITIAL_COURSE_STATE = {
  _id: "0", 
  name: "New Course", 
  number: "New Number",
  startDate: "2023-09-10", 
  endDate: "2023-12-15",
  image: "/images/reactjs.jpg", 
  description: "New Description",
};

export default function Dashboard() {
  // --- REDUX STATE ---
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  // *** Check if the current user has the 'FACULTY' role ***
  const isFaculty = currentUser?.role === "FACULTY";

  // Get the static enrollments list from the database
  const { enrollments } = db;

  // --- LOCAL STATE (FIXED FOR RESET) ---
  const [course, setCourse] = useState<any>(INITIAL_COURSE_STATE);

  // --- NEW FILTERING LOGIC (Faculty Sees ADDED Courses + Enrolled Courses) ---
  const enrolledCourses = courses.filter((course: any) => { 
    if (!currentUser) {
      return false; 
    }
    
    // 🛑 NEW FILTER LOGIC: Check if the user is the creator (Faculty only)
    const isCreator = isFaculty && course.user === currentUser._id;
    
    // Existing Enrollment Check: Check if the user is enrolled
    const isEnrolled = enrollments.some(
      (enrollment: any) => 
        enrollment.user === currentUser._id &&
        enrollment.course === course._id
    );
    
    // Display the course if the user is the creator OR they are enrolled
    return isCreator || isEnrolled;
  });
  // 

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* 🛑 START ROLE CHECK: ONLY FACULTY SEE THE CRUD FORM */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => {
                // ✅ UPDATED DISPATCH: Send the course data AND the user ID in the payload
                dispatch(addNewCourse({ 
                    newCourseData: course, 
                    userId: currentUser._id 
                }));
                setCourse(INITIAL_COURSE_STATE); // Resets the form
              }}
            >
              Add
            </Button>
            <Button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </Button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}
      {/* 🛑 END ROLE CHECK: CRUD FORM */}


      {/* --- COURSE LIST (Using enrolledCourses for visibility) --- */}
      <h2 id="wd-dashboard-published">Published Courses ({enrolledCourses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4 wd-dashboard-row">
          {enrolledCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Card.Img
                  src="/images/reactjs.jpg"
                  variant="top"
                  width="100%"
                  height={160}
                />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    {course.name}
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </Card.Text>
                  
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="btn btn-primary"
                  >
                    Go
                  </Link>
                  
                  {/* 🛑 START ROLE CHECK: ONLY FACULTY SEE EDIT/DELETE BUTTONS */}
                  {isFaculty && (
                    <>
                      <Button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        variant="warning"
                        className="me-2 float-end"
                      >
                        Edit
                      </Button>
                      <Button
                        id="wd-delete-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(course._id));
                        }}
                        variant="danger"
                        className="float-end"
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  {/* 🛑 END ROLE CHECK: EDIT/DELETE BUTTONS */}

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}