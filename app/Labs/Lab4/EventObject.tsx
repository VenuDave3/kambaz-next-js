/* eslint-disable */
"use client"; // This component uses state and interacts with the browser
import { useState } from "react";

export default function EventObject() {
  const [event, setEvent] = useState(null); // 1. Use state to hold the event object

  const handleClick = (e: any) => {
    // 2. Clean up the event object to avoid errors when stringifying
    e.target = e.target.outerHTML;
    delete e.view;
    
    // 3. Save the cleaned-up event object in state
    setEvent(e);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button onClick={(e) => handleClick(e)}
              className="btn btn-primary"
              id="wd-display-event-obj-click">
        Display Event Object
      </button>
      
      {/* 4. Display the state variable as a formatted JSON string */}
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr/>
    </div>
  );
}