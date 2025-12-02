/* eslint-disable */
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isActive = (href: string) => pathname?.toLowerCase().includes(href.toLowerCase());

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
      
      {!currentUser ? (
        <React.Fragment>
          {Item('/Account/Signin', 'wd-account-signin-link', 'Signin')}<br/>
          {Item('/Account/Signup', 'wd-account-signup-link', 'Signup')}<br/>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {Item('/Account/Profile', 'wd-account-profile-link', 'Profile')}<br/>
          {/* FIXED: Cast currentUser to 'any' to resolve the TypeScript error */}
          {(currentUser as any)?.role === "ADMIN" && (
            <React.Fragment>
              {Item('/Account/Users', 'wd-account-users-link', 'Users')}<br/>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}