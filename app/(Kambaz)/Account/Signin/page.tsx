"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="account-form">
      <h2 className="mb-3">Signin</h2>
      <Card className="p-3">
        <Form>
          <FormControl
            id="wd-username"
            placeholder="username"
            defaultValue="alice"
            className="mb-2"
          />
          <FormControl
            id="wd-password"
            placeholder="password"
            type="password"
            defaultValue="123"
            className="mb-3"
          />

          <Link href="/Dashboard" passHref legacyBehavior>
            <Button id="wd-signin-btn" variant="primary" className="w-100 mb-2">
              Signin
            </Button>
          </Link>

          <Link id="wd-signup-link" href="/Account/Signup">
            Signup
          </Link>
        </Form>
      </Card>
    </div>
  );
}
