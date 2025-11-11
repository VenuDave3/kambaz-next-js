'use client';
import { useParams } from "next/navigation"; // Hook to get URL parameters (cid)
import { users, enrollments } from "../../../../Database"; // Import data arrays
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { InputGroup, FormControl, Button } from "react-bootstrap"; // Controls for better UX (optional, but good practice)
import { FaSearch } from "react-icons/fa";

// Define interfaces for type safety (matching your database structure)
interface User { 
  _id: string; 
  firstName: string; 
  lastName: string; 
  loginId: string; 
  role: string; 
  section: string; 
  lastActivity: string; 
  totalActivity: string; 
}
interface Enrollment { _id: string; user: string; course: string; }

export default function PeopleTable() {
  // 1. Get the current Course ID from the URL
  const { cid } = useParams();
  
  // 2. Safely cast the imported data arrays
  const userList: User[] = users as User[];
  const enrollmentList: Enrollment[] = enrollments as Enrollment[];

  return (
    <div id="wd-people-table" className="p-2">
      <h3>People</h3>

      {/* People Controls (Adapted to your existing structure) */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="w-25">
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <FormControl placeholder="Search people" />
        </InputGroup>
        <Button variant="secondary"> + Group </Button>
      </div>

      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {/* REPLACING STATIC ROWS WITH DYNAMIC FILTERING */}
          {userList
            .filter((usr: User) =>
              // FILTER LOGIC: Find users whose ID is present in an enrollment record 
              // that matches the current Course ID (cid).
              enrollmentList.some((enrollment: Enrollment) => 
                enrollment.user === usr._id && enrollment.course === cid
              )
            )
            .map((user: User) => (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>
                  <span className="wd-last-name"> {user.lastName}</span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}