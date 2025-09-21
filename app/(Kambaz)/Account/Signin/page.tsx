import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input placeholder="username" className="wd-username" /> <br />
      <input placeholder="password" type="password" className="wd-password" /> <br />

      {/* Go to Dashboard after signing in */}
      <Link id="wd-signin-btn" href="/Dashboard"> Sign in </Link> <br />

      {/* Keep signup link pointing to Signup */}
      <Link id="wd-signup-link" href="Signup"> Sign up </Link>
    </div>
  );
}
