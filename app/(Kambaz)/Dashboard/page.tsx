/* eslint-disable */
/* eslint-disable */
"use client";
import { useState } from "react";
import Link from "next/link";
// --- REDUX IMPORTS ---
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store"; // 1. DELETE THIS LINE
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
import * as db from "../Database"; // 1. We need this for the 'enrollments' list
// --- END NEW IMPORT ---

export default function Dashboard() {
  // --- REDUX STATE ---
  // 2. THIS IS THE "CHEAT" - Changed 'RootState' to 'any'
  const { courses } = useSelector((state: any) => state.coursesReducer);
  // 3. THIS IS THE "CHEAT" - Changed 'RootState' to 'any'
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  // 4. Get the static enrollments list from the database
  const { enrollments } = db;

  // --- LOCAL STATE (Unchanged) ---
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
  });

  // --- NEW FILTERING LOGIC (THE "SAFE" WAY) ---
  const enrolledCourses = courses.filter((course: any) => { // Added :any
    // 5. THIS IS THE SAFETY CHECK: If no user is logged in, show no courses.
    if (!currentUser) {
      return false;
    }
    // 6. Now we know 'currentUser' exists, so we can safely check 'currentUser._id'
    return enrollments.some(
      (enrollment: any) => // Added :any
        enrollment.user === currentUser._id &&
        enrollment.course === course._id
    );
  });
  // 

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* --- NEW COURSE FORM (Unchanged) --- */}
      <h5>
        New Course
        <Button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
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

      {/* --- COURSE LIST --- */}
      {/* 7. Update the count to use the *filtered* list */}
      <h2 id="wd-dashboard-published">Published Courses ({enrolledCourses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4 wd-dashboard-row">
          {/* 8. Map over the new 'enrolledCourses' list */}
          {enrolledCourses.map((course: any) => ( // Added :any
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                {/* ... (The rest of your card is unchanged) ... */}
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}