/* eslint-disable */
"use client";
import { Form, FormControl, Button, Card, FormSelect } from "react-bootstrap";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// --- THIS IS THE CHAPTER 5 LOGIC ---
import * as client from "../client"; // 1. IMPORT THE NEW CLIENT
import { setCurrentUser } from "../reducer";
// --- END NEW LOGIC ---

export default function Profile() {
  const dispatch = useDispatch();

  // We use (state: any) as you wanted.
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // This state is for editing the form fields
  const [profile, setProfile] = useState<any>({
    loginId: "", password: "", firstName: "",
    lastName: "", dob: "", email: "", role: "USER",
    ...currentUser,
  });

  // --- NEW ASYNC fetchProfile (from 5.3.2.4) ---
  const fetchProfile = async () => {
    try {
      // Check the server's session, not Redux
      const user = await client.profile(); 
      dispatch(setCurrentUser(user)); // Put the user from server into Redux
      setProfile(user); // Fill the form with the user
    } catch (error) {
      // If server sends 401 (not logged in), go to Signin
      redirect("/Account/Signin");
    }
  };

  // --- NEW ASYNC signout (from 5.3.2.5) ---
  const signout = async () => {
    await client.signout(); // Tell the server to destroy the session
    dispatch(setCurrentUser(null)); // Clear Redux
    redirect("/Account/Signin"); // Go to signin
  };

  // --- NEW updateProfile (from 5.3.2.3) ---
  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  // This runs fetchProfile() once when the component first renders
  useEffect(() => {
    fetchProfile();
  }, []); // The empty [] means "run once"

  // This handles form field changes (unchanged)
  const handleProfileChange = (e: any) => {
    setProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div id="wd-profile-screen" className="account-form">
      <h2 className="mb-3">Profile</h2>

      {/* We only show the form if the profile has been loaded */}
      {profile.loginId && (
        <Card className="p-3">
          <Form>
            
            {/* All your form fields are correct and use 'value' and 'onChange' */}
            
            <label>Username (Login ID)</label>
            <FormControl
              id="loginId" // From your users.json
              className="mb-2"
              value={profile.loginId || ""} 
              onChange={handleProfileChange}
            />
            <label>Password</label>
            <FormControl
              id="password" // From your users.json
              type="password"
              className="mb-2"
              value={profile.password || ""}
              onChange={handleProfileChange}
            />
            <label>First Name</label>
            <FormControl
              id="firstName" // From your users.json
              className="mb-2"
              value={profile.firstName || ""}
              onChange={handleProfileChange}
            />
            <label>Last Name</label>
            <FormControl
              id="lastName" // From your users.json
              className="mb-2"
              value={profile.lastName || ""}
              onChange={handleProfileChange}
            />
            <label>Date of Birth</label>
            <FormControl
              id="dob" // From your users.json
              type="date"
              className="mb-2"
              value={profile.dob || ""}
              onChange={handleProfileChange}
            />
            <label>Email</label>
            <FormControl
              id="email" // From your users.json
              type="email"
              className="mb-2"
              value={profile.email || ""}
              onChange={handleProfileChange}
            />
            <label>Role</label>
            <Form.Select
              id="role"
              value={profile.role || "USER"}
              className="mb-3"
              onChange={handleProfileChange}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>

            {/* --- NEW BUTTON (from 5.3.2.3) --- */}
            <Button
              id="wd-update-profile-btn"
              variant="primary"
              className="w-100 mb-2"
              onClick={updateProfile}
            >
              Update
            </Button>
            {/* --- END NEW BUTTON --- */}

            <Button
              id="wd-signout-btn"
              variant="danger"
              className="w-100"
              onClick={signout} // Now calls the new async signout
            >
              Sign out
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
}