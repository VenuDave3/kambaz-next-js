/* eslint-disable */
"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import * as db from "../../Database"; // 1. REMOVE this
import * as client from "../client"; // 2. ADD this import

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    loginId: "diana",
    password: "diana",
  });
  const dispatch = useDispatch();

  // 3. Make the function ASYNC
  const signin = async () => {
    try {
      // 4. Call the client API instead of the local DB
      const user = await client.signin({
        username: credentials.loginId, // The server route expects 'username'
        password: credentials.password,
      });
      
      // 5. If successful, dispatch and redirect
      dispatch(setCurrentUser(user));
      redirect("/Dashboard"); // This path is correct

    } catch (error: any) {
      // 6. If server sends a 401 error, show an alert
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message || "Invalid username or password");
      } else {
        alert("An error occurred during sign-in.");
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
            defaultValue={credentials.loginId}
            className="mb-2"
            onChange={(e) =>
              setCredentials({ ...credentials, loginId: e.target.value })
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