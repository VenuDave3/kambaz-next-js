/* eslint-disable */
"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";
// Use useRouter for navigation after successful API call
import { useRouter } from "next/navigation"; 
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client"; 

export default function Signin() {
  // Use 'username' in state to match the payload property name
  const [credentials, setCredentials] = useState<any>({
    username: "iron_man", // Example credential
    password: "stark123",  // Example credential
  });
  const dispatch = useDispatch();
  const router = useRouter(); // Use useRouter for client-side navigation

  const signin = async () => {
    try {
      // Send credentials directly, as state keys (username, password) now match payload keys
      const user = await client.signin(credentials); 
      
      // If successful, dispatch and redirect
      dispatch(setCurrentUser(user));
      router.push("/Dashboard"); 

    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message || "Invalid username or password");
      } else {
        // If it's a network error, this generic alert catches it
        alert("An error occurred during sign-in. Check server and network logs.");
      }
    }
  };

  return (
    <div id="wd-signin-screen" className="account-form">
      <h2 className="mb-3">Signin</h2>
      <Card className="p-3">
        <Form>
          <FormControl
            id="wd-username"
            placeholder="username"
            defaultValue={credentials.username} // Use .username
            className="mb-2"
            onChange={(e) =>
              // Update 'username' property in state
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            placeholder="password"
            type="password"
            defaultValue={credentials.password}
            className="mb-3"
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button
            id="wd-signin-btn"
            variant="primary"
            className="w-100 mb-2"
            onClick={signin}
          >
            Signin
          </Button>

          <Link id="wd-signup-link" href="/Account/Signup">
            Signup
          </Link>
        </Form>
      </Card>
    </div>
  );
}