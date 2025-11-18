"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  // State for Assignment (from 5.2.3.3)
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  
  // State for Module ("On Your Own" 5.2.3.4)
  const [module, setModule] = useState({
    id: "M101", name: "Intro to Node.js",
    description: "Learn the basics of Node.js and Express.",
    course: "CS5610"
  });
  
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      
      {/* ----- GIVEN CODE (5.2.3.1) ----- */}
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${ASSIGNMENT_API_URL}`}>
        Get Assignment
      </a>
      {/* ----- "ON YOUR OWN" (5.2.3.4) ----- */}
      <a id="wd-retrieve-modules" className="btn btn-success ms-2"
         href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <hr/>
      
      {/* ----- GIVEN CODE (5.2.3.2) ----- */}
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${ASSIGNMENT_API_URL}/title`}>
        Get Title
      </a>
      {/* ----- "ON YOUR OWN" (5.2.3.4) ----- */}
      <a id="wd-retrieve-module-name" className="btn btn-success ms-2"
         href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>
      <hr/>
      
      {/* ----- GIVEN CODE (5.2.3.3) ----- */}
      <h4>Modifying Properties</h4>
      <div className="mb-3">
        <a id="wd-update-assignment-title"
           className="btn btn-primary float-end"
           href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
          Update Title 
        </a>
        <FormControl className="w-75" id="wd-assignment-title"
          value={assignment.title} onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })}/>
      </div>

      {/* ----- "ON YOUR OWN" (5.2.3.4) ----- */}
      <div className="mb-3">
        <a id="wd-update-module-name"
           className="btn btn-success float-end"
           href={`${MODULE_API_URL}/name/${module.name}`}>
          Update Module Name
        </a>
        <FormControl className="w-75" id="wd-module-name"
          value={module.name} onChange={(e) =>
            setModule({ ...module, name: e.target.value })}/>
      </div>
      <div className="mb-3">
        <a id="wd-update-assignment-score"
           className="btn btn-primary float-end"
           href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
          Update Score
        </a>
        <FormControl className="w-75" id="wd-assignment-score" type="number"
          value={assignment.score} onChange={(e) =>
            setAssignment({ ...assignment, score: parseInt(e.target.value) || 0 })}/>
      </div>
      <div className="mb-3">
        <a id="wd-update-assignment-completed"
           className="btn btn-primary float-end"
           href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
          Update Completed
        </a>
        <input className="form-check-input" type="checkbox" id="wd-assignment-completed"
          checked={assignment.completed} onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })}/>
        <label className="ms-2" htmlFor="wd-assignment-completed">Completed</label>
      </div>
      <div className="mb-3">
        <a id="wd-update-module-description"
           className="btn btn-success float-end"
           href={`${MODULE_API_URL}/description/${module.description}`}>
          Update Description
        </a>
        <FormControl className="w-75" id="wd-module-description"
          value={module.description} onChange={(e) =>
            setModule({ ...module, description: e.target.value })}/>
      </div>
      {/* ----- END "ON YOUR OWN" ----- */}
      <hr />
    </div> 
  );
}