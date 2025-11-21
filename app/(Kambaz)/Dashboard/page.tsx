/* eslint-disable */
"use client";
import { useState, useEffect } from "react"; 
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// NOTE: Assuming your courses reducer is named 'coursesReducer' and is the default export
import { setCourses } from "../Courses/coursesReducer"; 
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

// Import client modules for API calls and account checks
import * as client from "../Courses/client"; 
import * as accountClient from "../Account/client"; 
// ✅ NEW IMPORT: Enrollment client module
import * as enrollmentClient from "../Enrollments/client"; 

import { setCurrentUser } from "../Account/reducer";

// ✅ NEW IMPORTS: Enrollment Redux actions
import { 
  enrollUserInCourse,
  unenrollUserFromCourse,
  setEnrollments,
} from "../Enrollments/reducer";

// Define a type for the structure of your RootState for clarity
type RootState = {
  coursesReducer: { courses: any[] };
  accountReducer: { currentUser: any };
  enrollmentsReducer: { enrollments: any[] }; // Required for new functionality
};


export default function Dashboard() {
  // --- REDUX STATE ---
  // Ensure useSelector uses the correct root state properties based on your store.ts
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  // ✅ NEW: Retrieve enrollments from the store
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer); 
  const dispatch = useDispatch();
  
  // --- LOCAL STATE (Used for the form inputs/editing) ---
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
  });
  
  // ✅ NEW: State to toggle between My Enrollments (false) and All Courses (true)
  const [showAllCourses, setShowAllCourses] = useState(false);


  // --- Enrollment Status Helper (Uses Redux enrollment data) ---
  const checkEnrollmentStatus = (courseId: string) =>
    enrollments.some(
      (en: any) => en.user === currentUser?._id && en.course === courseId
    );

  // --- ASYNC PROFILE CHECKER (Stability Fix) ---
  const checkProfile = async () => {
    if (!currentUser) {
      try {
        const user = await accountClient.profile();
        dispatch(setCurrentUser(user));
      } catch (error) {
        dispatch(setCurrentUser(null)); 
      }
    }
  };

  // ✅ NEW: Fetches ALL enrollment records for populating the Redux state
  const fetchEnrollmentRecords = async () => {
    try {
      const rows = await enrollmentClient.findAllEnrollments();
      dispatch(setEnrollments(rows));
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
    }
  };


  // --- UPDATED: Data Fetching (Now considers showAllCourses flag) ---
  const fetchCourses = async () => {
    if (!currentUser) {
      dispatch(setCourses([])); 
      return; 
    }
    
    try {
      let courseList;
      if (showAllCourses) {
        // Fetch ALL courses (for All Enrollments view)
        courseList = await client.fetchAllCourses(); 
      } else {
        // Fetch courses for the current user only (for My Enrollments view)
        courseList = await client.findMyCourses(); 
      }
      dispatch(setCourses(courseList));
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch(setCurrentUser(null)); 
        dispatch(setCourses([]));
      } else {
        console.error("Failed to load courses:", error);
      }
    }
  };

  // --- Enrollment Handlers (Client API calls + Redux updates) ---
  
  const handleEnrollment = async (courseId: string) => {
    if (!currentUser) return;
    try {
      // 1. Call server API (POST)
      await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
      
      // 2. Update local Redux state for responsiveness
      dispatch(enrollUserInCourse({ user: currentUser._id, course: courseId }));
      
      // If user is currently viewing "My Enrollments," re-fetch courses to update the list
      if (!showAllCourses) fetchCourses(); 
      
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  const handleUnenrollment = async (courseId: string) => {
    if (!currentUser) return;
    try {
      // 1. Call server API (DELETE)
      await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
      
      // 2. Update local Redux state for responsiveness
      dispatch(
        unenrollUserFromCourse({ user: currentUser._id, course: courseId })
      );
      
      // If user is viewing "My Enrollments," re-fetch courses to remove the unenrolled course
      if (!showAllCourses) fetchCourses(); 
      
    } catch (err) {
      console.error("Unenrollment failed:", err);
    }
  };

  // --- ASYNC CRUD HANDLERS (Minimal cleanup changes) ---
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    // Good practice: also remove the course from local enrollment records
    dispatch(unenrollUserFromCourse({ user: currentUser._id, course: courseId })); 
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })));
  };
  // --- END ASYNC CRUD HANDLERS ---


  // 1. Initial Mount: Check session status and fetch ALL enrollment records
  useEffect(() => {
    checkProfile();
    fetchEnrollmentRecords(); 
  }, []); 
  
  // 2. Data Fetch: Triggered when currentUser status is known OR showAllCourses is toggled
  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    } else {
      dispatch(setCourses([]));
    }
  }, [currentUser, showAllCourses]); // Added showAllCourses dependency

  // Ensure only Faculty sees the editing form
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* --- COURSE FORM / EDIT CONTROLS (Only visible to Faculty) --- */}
      {isFaculty && (
        <>
          <h5>
            New Course
            {/* Enrollment Toggle Button for Faculty */}
            <Button
              variant="primary"
              className="float-end"
              id="wd-enrollments-btn"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              {showAllCourses ? "My Enrollments" : "All Enrollments"}
            </Button>

            <button
              className="btn btn-primary float-end me-2"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse} 
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={onUpdateCourse} 
            >
              Update
            </button>
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

      {/* --- STUDENT Enrollment Toggle Button (If not faculty) --- */}
      {!isFaculty && currentUser && (
        <Button
          variant="primary"
          className="float-end mb-3"
          id="wd-enrollments-btn"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Enrollments" : "All Courses"}
        </Button>
      )}

      <div className="clearfix" />

      {/* --- COURSE LIST --- */}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} ({courses.length})
      </h2>
      <hr />
      
      {currentUser && (
        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4 wd-dashboard-row">
            {courses.map((course: any) => (
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
                    
                    {/* Link to Course Home */}
                    <Link
                      href={`/Courses/${course._id}/Home`}
                      className="btn btn-primary"
                    >
                      Go
                    </Link>
                    
                    {/* --- ENROLLMENT/UNENROLLMENT BUTTONS (Visible when listing courses) --- */}
                    {/* Buttons are only needed when viewing the All Courses list (showAllCourses is true) */}
                    {showAllCourses && (
                        checkEnrollmentStatus(course._id) ? (
                            <Button
                                variant="danger"
                                className="ms-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleUnenrollment(course._id);
                                }}
                            >
                                Unenroll
                            </Button>
                        ) : (
                            <Button
                                variant="success"
                                className="ms-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleEnrollment(course._id);
                                }}
                            >
                                Enroll
                            </Button>
                        )
                    )}
                    
                    {/* --- Faculty CRUD Buttons (Visible only if Faculty) --- */}
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
                                    onDeleteCourse(course._id);
                                }}
                                variant="danger"
                                className="float-end"
                            >
                                Delete
                            </Button>
                        </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}