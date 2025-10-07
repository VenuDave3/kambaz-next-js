"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="account-form">
      <h2 className="mb-3">Signup</h2>
      <Card className="p-3">
        <Form>
          <FormControl
            id="wd-username"
            placeholder="username"
            className="mb-2"
          />
          <FormControl
            id="wd-password"
            placeholder="password"
            type="password"
            className="mb-3"
          />

          <Link href="/Account/Profile" passHref legacyBehavior>
            <Button id="wd-signup-btn" variant="primary" className="w-100 mb-2">
              Signup
            </Button>
          </Link>

          <Link id="wd-signin-link" href="/Account/Signin">
            Signin
          </Link>
        </Form>
      </Card>
    </div>
  );
}
