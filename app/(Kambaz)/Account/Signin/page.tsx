/* eslint-disable */
"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({
    loginId: "diana",
    password: "diana",
  });
  const dispatch = useDispatch();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.loginId === credentials.loginId &&
        u.password === credentials.password
    );
    if (!user) {
      alert("Invalid username or password");
      return;
    }
    dispatch(setCurrentUser(user));
    
    // --- THIS IS THE FIX ---
    redirect("/Dashboard"); // Removed "/Kambaz"
    // --- END FIX ---
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

          {/* --- THIS IS ALSO FIXED --- */}
          <Link id="wd-signup-link" href="/Account/Signup"> {/* Removed "/Kambaz" */}
            Signup
          </Link>
          {/* --- END FIX --- */}
        </Form>
      </Card>
    </div>
  );
}