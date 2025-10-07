"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="account-form">
      <h2 className="mb-3">Profile</h2>
      <Card className="p-3">
        <Form>
          <FormControl
            id="wd-username"
            defaultValue="alice"
            placeholder="username"
            className="mb-2"
          />
          <FormControl
            id="wd-password"
            defaultValue="123"
            type="password"
            placeholder="password"
            className="mb-2"
          />
          <FormControl
            id="wd-firstname"
            defaultValue="Alice"
            placeholder="First Name"
            className="mb-2"
          />
          <FormControl
            id="wd-lastname"
            defaultValue="Wonderland"
            placeholder="Last Name"
            className="mb-2"
          />
          <FormControl
            id="wd-dob"
            type="date"
            defaultValue="2000-01-01"
            className="mb-2"
          />
          <FormControl
            id="wd-email"
            defaultValue="alice@wonderland.com"
            type="email"
            placeholder="email"
            className="mb-2"
          />

          {/* Role dropdown */}
          <Form.Select id="wd-role" defaultValue="FACULTY" className="mb-3">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>

          {/* Signout button */}
          <Link href="/Account/Signin" passHref legacyBehavior>
            <Button
              id="wd-signout-btn"
              variant="danger"
              className="w-100"
            >
              Sign out
            </Button>
          </Link>
        </Form>
      </Card>
    </div>
  );
}
