'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // 1. Import React (for React.Fragment)
// --- NEW REDUX IMPORTS ---
import { useSelector } from "react-redux";
import { RootState } from "../store";
// --- END NEW IMPORTS ---

export default function AccountNavigation() {
  const pathname = usePathname();

  // --- NEW REDUX LOGIC ---
  // 2. Get the current user from the Redux store
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  // --- END NEW LOGIC ---

  const isActive = (href: string) => pathname?.toLowerCase().includes(href.toLowerCase());

  // Your Item helper function is unchanged
  const Item = (href: string, id: string, label: string) => (
    <Link
      href={href}
      id={id}
      className={`list-group-item border-0 ${isActive(href) ? 'active' : 'text-danger'}`}
    >
      {label}
    </Link>
  );

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0" style={{ width: 220 }}>
      
      {/* --- THIS IS THE CHANGE --- */}
      {/* We use a ternary operator to check if 'currentUser' exists */}
      
      {!currentUser ? (
        // 3. If Logged OUT, show Signin and Signup
        <React.Fragment>
          {Item('/Account/Signin', 'wd-account-signin-link', 'Signin')}<br/>
          {Item('/Account/Signup', 'wd-account-signup-link', 'Signup')}<br/>
        </React.Fragment>
      ) : (
        // 4. If Logged IN, show Profile
        <React.Fragment>
          {Item('/Account/Profile', 'wd-account-profile-link', 'Profile')}<br/>
        </React.Fragment>
      )}
    </div>
  );
}