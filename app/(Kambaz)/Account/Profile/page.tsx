/* eslint-disable */
"use client";
import { Form, FormControl, Button, FormSelect, Card } from "react-bootstrap";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as client from "../client"; 
import { setCurrentUser } from "../reducer";

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Initialize profile state based on fields in your users.js, 
  // defaulting to the current user data if available.
  const [profile, setProfile] = useState<any>({}); 

  // --- Profile Loading and Data Synchronization ---
  const fetchProfile = async () => {
    try {
      // Fetch the actual user data from the server session
      const user = await client.profile(); 
      
      // Update Redux state and local state simultaneously
      dispatch(setCurrentUser(user)); 
      
      // IMPORTANT: Map the user data to the local state
      // (This handles the required persistence logic)
      setProfile({
        ...user,
        // Ensure username is mapped correctly if the original user object
        // does not contain all the fields (though yours does).
      });
      
    } catch (error) {
      // If server returns 401 (not logged in), redirect
      redirect("/Account/Signin");
    }
  };

  // --- Event Handlers ---
  const handleProfileChange = (e: any) => {
    // Uses the generic [e.target.id] structure for originality
    setProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      // Send the entire local profile state to the server
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  const signout = async () => {
    await client.signout(); 
    dispatch(setCurrentUser(null)); 
    redirect("/Account/Signin"); 
  };
  
  // --- Lifecycle Hook ---
  useEffect(() => {
    // Execute the function to check session/fetch profile when the component loads
    fetchProfile();
  }, []); 

  return (
    <div id="wd-profile-screen" className="account-form">
      <h2 className="mb-3">Profile</h2>

      {/* Render form only when essential data (like username/email) is loaded */}
      {profile.username && (
        <Card className="p-3">
          <Form>
            
            {/* --- FORM FIELDS: Maintaining your original look and feel --- */}
            
            <label>Username</label>
            <FormControl
              id="username" // Using 'username' here matches the data model from your users.js
              className="mb-2"
              value={profile.username || ""} 
              onChange={handleProfileChange}
            />
            <label>Password</label>
            <FormControl
              id="password"
              type="password"
              className="mb-2"
              value={profile.password || ""}
              onChange={handleProfileChange}
            />
            <label>First Name</label>
            <FormControl
              id="firstName"
              className="mb-2"
              value={profile.firstName || ""}
              onChange={handleProfileChange}
            />
            <label>Last Name</label>
            <FormControl
              id="lastName"
              className="mb-2"
              value={profile.lastName || ""}
              onChange={handleProfileChange}
            />
            <label>Date of Birth</label>
            <FormControl
              id="dob"
              type="date"
              className="mb-2"
              value={profile.dob ? profile.dob.substring(0, 10) : ""} // Clean up date format
              onChange={handleProfileChange}
            />
            <label>Email</label>
            <FormControl
              id="email"
              type="email"
              className="mb-2"
              value={profile.email || ""}
              onChange={handleProfileChange}
            />
            <label>Role</label>
            <FormSelect
              id="role"
              value={profile.role || "USER"}
              className="mb-3"
              onChange={handleProfileChange}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </FormSelect>

            {/* --- BUTTONS AT BOTTOM (Correct Placement) --- */}
            <Button
              id="wd-update-profile-btn"
              variant="primary"
              className="w-100 mb-2"
              onClick={updateProfile}
            >
              Update
            </Button>
            
            <Button
              id="wd-signout-btn"
              variant="danger"
              className="w-100"
              onClick={signout} 
            >
              Sign out
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
}