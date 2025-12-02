/* eslint-disable */
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleDetails from "./Details";
import * as client from "../../client";

export default function PeopleTable({ users = [], fetchUsers }: { users?: any[]; fetchUsers?: () => void; }) {
  const { cid } = useParams();
  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string>("");
  const [enrolledUsers, setEnrolledUsers] = useState<any[]>([]);

  const fetchEnrolledUsers = async () => {
    if (cid) {
      try {
        const users = await client.findUsersForCourse(cid as string);
        setEnrolledUsers(users);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (cid) {
      fetchEnrolledUsers();
    }
  }, [cid]);

  const usersToDisplay = cid ? enrolledUsers : users;

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            if (fetchUsers) {
              fetchUsers();
            } else if (cid) {
              fetchEnrolledUsers();
            }
          }}
        />
      )}

      <table className="table table-striped">
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
          {usersToDisplay.map((user: any) => {
            // SAFETY CHECK: If user is null, skip rendering this row
            if (!user) return null; 
            
            return (
              <tr key={user._id}>
                <td className="wd-full-name text-nowrap">
                  <span 
                    className="text-decoration-none cursor-pointer text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowDetails(true);
                      setShowUserId(user._id);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 512 512" className="me-2 fs-1 text-secondary" fill="currentColor" style={{ verticalAlign: "middle" }}>
                      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m0 80a72 72 0 1 1-72 72a72 72 0 0 1 72-72m0 304c-63.53 0-118.06-34.33-147.26-86.41c1.54-48.51 98.77-51.59 147.26-51.59s145.72 3.08 147.26 51.59C374.06 397.67 319.53 432 256 432"/>
                    </svg>
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </span>
                </td>
                <td className="wd-login-id">{user.loginId}</td>
                <td className="wd-section">{user.section}</td>
                <td className="wd-role">{user.role}</td>
                <td className="wd-last-activity">{user.lastActivity}</td>
                <td className="wd-total-activity">{user.totalActivity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}