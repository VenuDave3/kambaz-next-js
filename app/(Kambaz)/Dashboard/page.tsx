/* eslint-disable */
"use client";
import { useState } from "react"; // We still need this for the *form*
import Link from "next/link";
// --- REDUX IMPORTS ---
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
} from "../Courses/coursesReducer"; // Make sure this path is correct
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
// We no longer import from db.courses, we get it from Redux!

export default function Dashboard() {
  // --- REDUX STATE ---
  // 1. Get the courses list *from Redux*
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  // 2. Get the dispatch function
  const dispatch = useDispatch();
  
  // --- LOCAL STATE (for the form, this is unchanged) ---
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  // 4. The local functions (addNewCourse, deleteCourse, updateCourse)
  //    that used 'setCourses' are REMOVED.

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* --- NEW COURSE FORM --- */}
      <h5>
        New Course
        <Button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          // 5. Dispatch the 'addNewCourse' action to Redux
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </Button>
        <Button
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          // 6. Dispatch the 'updateCourse' action to Redux
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
      {/* 7. The .map() now reads from the 'courses' variable from Redux */}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4 wd-dashboard-row">
          {courses.map((course) => (
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
                  
                  <Button
                    id="wd-edit-course-click"
                    onClick={(event) => {
                      event.preventDefault();
                      // 8. "Edit" still just sets the *local* form state
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
                      // 9. Dispatch the 'deleteCourse' action to Redux
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