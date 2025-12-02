/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/coursesReducer";
import {
  Row,
  Col,
  Card,
  Button,
  FormControl,
} from "react-bootstrap";

// Import client modules
import * as client from "../Courses/client"; // ✅ UPDATED: Enrollment functions are now here
import * as accountClient from "../Account/client";
// Removed: import * as enrollmentClient ... (Functions moved to Courses/client)

import { setCurrentUser } from "../Account/reducer";

// Removed: Enrollment Redux imports (We manage enrollment state locally here for simplicity)

type RootState = {
  coursesReducer: { courses: any[] };
  accountReducer: { currentUser: any };
  // Removed enrollmentsReducer from type
};


export default function Dashboard() {
  // --- REDUX STATE ---
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  // --- LOCAL STATE ---
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description",
  });
  const [showAllCourses, setShowAllCourses] = useState(false);
  // ✅ NEW: Track courses I am enrolled in (Returns array of Course Objects)
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);


  // --- Enrollment Status Helper ---
  const checkEnrollmentStatus = (courseId: string) => {
    if(!enrolledCourses) return false;
    // Check if the course exists in my enrolled list
    return enrolledCourses.some((c: any) => c._id === courseId);
  }

  // --- ASYNC PROFILE CHECKER ---
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

  // ✅ NEW: Helper to fetch just the courses I am enrolled in
  const fetchEnrolledCourses = async () => {
    try {
      if(currentUser) {
        const myCourses = await client.findMyCourses();
        setEnrolledCourses(myCourses);
      }
    } catch (err) {
      console.error("Failed to fetch enrolled courses:", err);
    }
  };

  // --- UPDATED: Data Fetching ---
  const fetchCourses = async () => {
    if (!currentUser) {
      dispatch(setCourses([]));
      return;
    }
    try {
      let courseList;
      if (showAllCourses) {
        // Fetch ALL courses
        courseList = await client.fetchAllCourses();
      } else {
        // Use the enrolled courses we already fetched
        courseList = enrolledCourses;
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

  // --- Enrollment Handlers (Updated to use Courses/client) ---
  const handleEnrollment = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.enrollIntoCourse(currentUser._id, courseId);
      // Refresh data
      await fetchEnrolledCourses();
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  const handleUnenrollment = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await client.unenrollFromCourse(currentUser._id, courseId);
      // Refresh data
      await fetchEnrolledCourses();
    } catch (err) {
      console.error("Unenrollment failed:", err);
    }
  };

  // --- ASYNC CRUD HANDLERS ---
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
    // Auto-refresh enrollments because creator is enrolled
    fetchEnrolledCourses();
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
    fetchEnrolledCourses();
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })));
  };
  // --- END ASYNC CRUD HANDLERS ---


  // 1. Initial Mount
  useEffect(() => {
    checkProfile();
  }, []);

  // 2. When User is known, load their enrollments
  useEffect(() => {
    if (currentUser) {
      fetchEnrolledCourses();
    }
  }, [currentUser]);
  // 3. When Toggle changes or Enrollments update, update the main list
  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    } else {
      dispatch(setCourses([]));
    }
  }, [currentUser, showAllCourses, enrolledCourses.length]);


  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* --- COURSE FORM / EDIT CONTROLS --- */}
      {isFaculty && (
        <>
          <h5>
            New Course
            <Button
              variant="primary"
              className="float-end"
              id="wd-enrollments-btn"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              {showAllCourses ? "My Enrollments" : "All Enrollments"}
            </Button>

            <button className="btn btn-primary float-end me-2" id="wd-add-new-course-click" onClick={onAddNewCourse}>
              Add
            </button>
            <button className="btn btn-warning float-end me-2" id="wd-update-course-click" onClick={onUpdateCourse}>
              Update
            </button>
          </h5>
          <br />
          <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })}/>
          <FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })}/>
          <hr />
        </>
      )}

      {/* --- STUDENT Toggle --- */}
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
            {courses.map((course: any) => {
              // Determine status
              const isEnrolled = checkEnrollmentStatus(course._id);

              return (
                <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                  <Card>
                    <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description}
                      </Card.Text>
                      {/* ✅ FIX: Corrected Path (removed /Kambaz prefix) */}
                      {isEnrolled ? (
                        <Link href={`/Courses/${course._id}/Home`} className="btn btn-primary">
                          Go
                        </Link>
                      ) : (
                        // Placeholder for spacing if needed
                        <span style={{display:"inline-block", height:"38px"}}></span>
                      )}
                      {/* --- ENROLLMENT BUTTONS --- */}
                      {showAllCourses && (
                        isEnrolled ? (
                          <Button variant="danger" className="ms-2" onClick={(e) => {
                              e.preventDefault();
                              handleUnenrollment(course._id);
                          }}>
                              Unenroll
                          </Button>
                        ) : (
                          <Button variant="success" className="ms-2" onClick={(e) => {
                              e.preventDefault();
                              handleEnrollment(course._id);
                          }}>
                              Enroll
                          </Button>
                        )
                      )}
                      {/* --- Faculty CRUD Buttons --- */}
                      {isFaculty && (
                        <>
                          <Button id="wd-edit-course-click" onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                          }} variant="warning" className="me-2 float-end">
                              Edit
                          </Button>
                          <Button id="wd-delete-course-click" onClick={(event) => {
                              event.preventDefault();
                              onDeleteCourse(course._id);
                          }} variant="danger" className="float-end">
                              Delete
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              )})}
          </Row>
        </div>
      )}
    </div>
  );
}