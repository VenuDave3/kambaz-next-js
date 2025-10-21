'use client'; 
import Link from "next/link";
// FIX: Import 'courses' directly from the index.ts file
import { courses } from "../Database"; 
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from 'react-bootstrap'; 

// Define the interface to avoid the 'no-explicit-any' error
interface Course {
    _id: string;
    name: string;
    description: string;
    // Include other properties if necessary for the map function, though _id, name, and description are key
}

export default function Dashboard() {
  // Use the imported 'courses' array, asserted to the Course[] type
  const courseList: Course[] = courses as Course[]; 

  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
      {/* Dynamically display the count of courses */}
      <h2 id="wd-dashboard-published">Published Courses ({courseList.length})</h2> <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4 wd-dashboard-row">
          
          {/* MAP FUNCTION: Loop over the courseList array */}
          {courseList.map((course: Course) => ( 
            <Col 
              key={course._id} // Use the unique ID as the key
              className="wd-dashboard-course" 
              style={{ width: "300px" }}
            >
              <Card>
                {/* DYNAMIC LINK: Encode the course's unique ID (_id) in the path */}
                <Link href={`/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  
                  <CardBody className="card-body">
                    {/* DYNAMIC CONTENT: Use course.name and course.description */}
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} 
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} 
                    </CardText>
                    <Button variant="primary"> Go </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}