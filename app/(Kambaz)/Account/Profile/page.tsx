/* eslint-disable */
"use client";
import Link from "next/link";
import { Form, FormControl, Button, Card } from "react-bootstrap";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) {
      return redirect("/Kambaz/Account/Signin");
    }
    setProfile(currentUser);
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    redirect("/Kambaz/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, [currentUser]); // Run this if currentUser changes

  return (
    <div id="wd-profile-screen" className="account-form">
      <h2 className="mb-3">Profile</h2>
      <Card className="p-3">
        <Form>
          <FormControl
            id="wd-username"
            defaultValue={profile.username}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <FormControl
            id="wd-password"
            defaultValue={profile.password}
            type="password"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <FormControl
            id="wd-firstname"
            defaultValue={profile.firstName}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <FormControl
            id="wd-lastname"
            defaultValue={profile.lastName}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <FormControl
            id="wd-dob"
            type="date"
            defaultValue={profile.dob}
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            defaultValue={profile.email}
            type="email"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />

          <Form.Select 
            id="wd-role" 
            defaultValue={profile.role} // Now reads from state
            className="mb-3"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>

          {/* CRITICAL CHANGE: Removed <Link>, added onClick={signout} */}
          <Button
            id="wd-signout-btn"
            variant="danger"
            className="w-100"
            onClick={signout}
          >
            Sign out
          </Button>
        </Form>
      </Card>
    </div>
  );
}