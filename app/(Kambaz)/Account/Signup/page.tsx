/* eslint-disable */
"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";
import { useRouter } from "next/navigation"; 
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as client from "../client"; 

export default function Signup() {
  const router = useRouter(); 

  const [user, setUser] = useState<any>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const newUser = await client.signup({ 
        ...user, 
        role: "STUDENT"
      });
      
      // We still dispatch the user to Redux temporarily
      // This is a safety measure, but we immediately sign them out below.
      dispatch(setCurrentUser(newUser));
      
      // 1. Log out the user from the current session
      await client.signout();
      dispatch(setCurrentUser(null));
      
      // 2. CRITICAL: Navigate to the Sign In page
      alert(`Registration successful! Please sign in as ${newUser.username}.`);
      router.push("/Account/Signin"); 

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred during sign-up.";
      
      if (error.response && error.response.status === 400) {
        alert(errorMessage);
      } else {
        alert("An unknown error occurred during sign-up.");
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
            value={user.username || ""} 
            className="mb-2"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <FormControl
            id="wd-password"
            placeholder="password"
            type="password"
            value={user.password || ""}
            className="mb-3"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

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