/* eslint-disable */
"use client";
import { useEffect, useState } from "react";
// Ensure this path matches your local structure:
// Details.tsx (in People) -> up to [cid] -> up to Courses -> up to Kambaz -> down to Account/client
import * as client from "../../../Account/client";

export default function PeopleDetails({ uid, onClose }: { uid: string; onClose: () => void; }) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    // Initialize the edit field with their full name
    setName(`${user.firstName} ${user.lastName}`);
  };

  const saveUser = async () => {
    // Simple logic: split name by space
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose(); // Close the panel after saving
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25" style={{ zIndex: 100 }}>
      {/* Close Button (X) */}
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" className="fs-1" fill="currentColor"><path d="M400 145.49L366.51 112L256 222.51L145.49 112L112 145.49L222.51 256L112 366.51L145.49 400L256 289.49L366.51 400L400 366.51L289.49 256L400 145.49z"/></svg>
      </button>

      <div className="text-center mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" className="text-secondary me-2 fs-1" fill="currentColor"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m0 80a72 72 0 1 1-72 72a72 72 0 0 1 72-72m0 304c-63.53 0-118.06-34.33-147.26-86.41c1.54-48.51 98.77-51.59 147.26-51.59s145.72 3.08 147.26 51.59C374.06 397.67 319.53 432 256 432"/></svg>
      </div>
      
      <hr />
      
      <div className="text-danger fs-4 wd-name">
        {/* Edit Button (Pencil) - Only show if NOT editing */}
        {!editing && (
          <svg onClick={() => setEditing(true)} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" className="float-end fs-5 mt-2 wd-edit" fill="currentColor" style={{ cursor: "pointer" }}><path d="M358.62 129.28L86.49 402.08 70 442l39.92-16.49 272.8-272.13-24.1-24.1zm54.45-54.44l-11.79 11.78 24.1 24.1 11.79-11.79a16.51 16.51 0 000-23.34l-.75-.75a16.51 16.51 0 00-23.35 0z"/></svg>
        )}
        {/* Save Button (Check) - Only show if editing */}
        {editing && (
          <svg onClick={() => saveUser()} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" className="float-end fs-5 mt-2 me-2 wd-save" fill="currentColor" style={{ cursor: "pointer" }}><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
        )}
        
        {/* Name Display - Click to edit */}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
            {user.firstName} {user.lastName}
          </div>
        )}
        
        {/* Name Input - Show when editing */}
        {user && editing && (
          <input
            className="form-control w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
            }}
          />
        )}
      </div>

      <div className="mb-2">
        <b>Roles:</b> <span className="wd-roles">{user.role}</span>
      </div>
      <div className="mb-2">
        <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span>
      </div>
      <div className="mb-2">
        <b>Section:</b> <span className="wd-section">{user.section}</span>
      </div>
      <div className="mb-2">
        <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
      </div>
      <hr />
      
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete">
        Delete
      </button>
      <button onClick={onClose} className="btn btn-secondary float-end me-2 wd-cancel">
        Cancel
      </button>
    </div>
  );
}