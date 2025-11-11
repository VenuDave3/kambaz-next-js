/* eslint-disable */
"use client";
// We are merging your <Form>, <Card> with the textbook's logic
import { Form, FormControl, Button, Card } from "react-bootstrap";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// --- FIX #1: THE IMPORT PATH ---
// The reducer is one level up, in the 'Account' folder. This path is correct.
import { setCurrentUser } from "../reducer";
// --- END FIX #1 ---

export default function Profile() {
  const dispatch = useDispatch();

  // --- FIX #2: THE "CHEAT" ---
  // We use (state: any) as you wanted. This hides the 'type: 'never' error.
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // --- END FIX #2 ---

  // We initialize state with the user's data OR empty strings
  // This prevents the "uncontrolled to controlled" React error
  const [profile, setProfile] = useState<any>({
    loginId: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
    ...currentUser, // This will override the empty strings if currentUser exists
  });

  // This function runs when the component loads
  const fetchProfile = () => {
    if (!currentUser) {
      // If no one is logged in, redirect to Signin
      return redirect("/Account/Signin");
    }
    // If logged in, fill the local 'profile' state with the user's info
    setProfile(currentUser);
  };

  // This function runs when you click "Sign out"
  const signout = () => {
    // Clear the user from the Redux store
    dispatch(setCurrentUser(null));
    // Send the user back to the Signin page
    redirect("/Account/Signin");
  };

  // This runs fetchProfile() once when the component first renders
  useEffect(() => {
    fetchProfile();
  }, []); // The empty [] means "run once"

  // This one function handles all form field changes
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
            
            {/* --- FIX #3: FORM LOGIC & DATA FIELDS --- */}
            {/* All fields now use 'value', 'onChange', and your 'users.json' 'id's */}
            
            <label>Username (Login ID)</label>
            <FormControl
              id="loginId" // From your users.json
              className="mb-2"
              value={profile.loginId || ""} // Use 'value' and '|| ""'
              onChange={handleProfileChange} // Use the new handler
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
            {/* --- END FIX #3 --- */}

            <Button
              id="wd-signout-btn"
              variant="danger"
              className="w-100"
              onClick={signout} // Use the new signout function
            >
              Sign out
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
}