/* eslint-disable */
"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";
// --- NEW IMPORTS ---
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client"; // We need the new client
// --- END NEW IMPORTS ---

export default function Signup() {
  // 1. Add state to hold the new user's data
  const [user, setUser] = useState<any>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  // 2. This is the new signup function
  const signup = async () => {
    try {
      // 3. Call the client API to create the user on the server
      // We send 'username' because that's what the server route expects
      // Your DAO will correctly map this to 'loginId'
      const newUser = await client.signup({ 
        loginId: user.username, // Send as loginId to match your users.js
        username: user.username, 
        password: user.password,
        role: "STUDENT" // Default role
      });
      
      // 4. If successful, log the new user in (save to Redux)
      dispatch(setCurrentUser(newUser));
      
      // 5. Redirect to the Profile page (using the correct path)
      redirect("/Account/Profile");

    } catch (error: any) {
      // 6. If server sends a 400 error (username taken), show an alert
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred during sign-up.");
      }
    }
  };

  return (
    <div id="wd-signup-screen" className="account-form">
      <h2 className="mb-3">Signup</h2>
      <Card className="p-3">
        <Form>
          <FormControl
            id="wd-username"
            placeholder="username"
            // 7. Use 'value' and 'onChange'
            value={user.username || ""}
            className="mb-2"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <FormControl
            id="wd-password"
            placeholder="password"
            type="password"
            // 8. Use 'value' and 'onChange'
            value={user.password || ""}
            className="mb-3"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          {/* 9. This is no longer a <Link>, it's a real <Button> */}
          <Button
            id="wd-signup-btn"
            variant="primary"
            className="w-100 mb-2"
            onClick={signup}
          >
            Signup
          </Button>

          <Link id="wd-signin-link" href="/Account/Signin">
            Signin
          </Link>
        </Form>
      </Card>
    </div>
  );
}