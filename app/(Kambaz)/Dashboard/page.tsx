/* eslint-disable */
"use client";
import { useState, useEffect } from "react"; // 1. ADD useEffect
import Link from "next/link";
// --- REDUX IMPORTS ---
import { useDispatch, useSelector } from "react-redux";
// 2. We CHANGE the imports to use setCourses (as per 5.3.4.1)
import {
  setCourses,
  // We will bring these back for the "On Your Own"
  // addNewCourse,
  // deleteCourse,
  // updateCourse,
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
// --- IMPORT CHANGES ---
import * as client from "../Courses/client"; // 3. ADD the new Courses client
// import * as db from "../Database"; // 4. REMOVE the local database import
// --- END IMPORT CHANGES ---

export default function Dashboard() {
  // --- REDUX STATE ---
  // 5. These are correct (using your "cheat")
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  
  // 6. REMOVE enrollments (server handles this)
  // const { enrollments } = db;

  // --- LOCAL STATE (Unchanged) ---
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
  });

  // --- NEW ASYNC DATA FETCHING (from 5.3.4.1) ---
  const fetchCourses = async () => {
    if (!currentUser) return; // Don't fetch if no one is logged in
    try {
      // 7. Call the API to get *only* the user's courses
      const courses = await client.findMyCourses();
      // 8. Put the courses from the server into the Redux store
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]); // Re-fetch if the user logs in
  // --- END NEW ASYNC DATA FETCHING ---

  
  // --- NEW ASYNC HANDLERS (from 5.3.4.2, 5.3.4.3, 5.3.4.4) ---
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    // 9. Update Redux state as per textbook
    dispatch(setCourses([ ...courses, newCourse ]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    // 10. Update Redux state as per textbook
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    // 11. Update Redux state as per textbook
    dispatch(setCourses(courses.map((c: any) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })));
  };
  // --- END NEW ASYNC HANDLERS ---

  // 12. REMOVE the local 'enrolledCourses' filter
  // const enrolledCourses = courses.filter(...) 

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* --- NEW COURSE FORM (onClick handlers are updated) --- */}
      <h5>
        New Course
        <Button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse} // 13. Use new async handler
        >
          Add
        </Button>
        <Button
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          onClick={onUpdateCourse} // 14. Use new async handler
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
      {/* 15. We just map over 'courses' now, it's already filtered by the server */}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4 wd-dashboard-row">
          {/* 16. Map over 'courses' from Redux */}
          {courses.map((course: any) => ( // Keeping (course: any) as requested
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
                      onDeleteCourse(course._id); // 17. Use new async handler
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