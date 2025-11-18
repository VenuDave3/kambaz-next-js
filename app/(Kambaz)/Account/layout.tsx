"use client"; // 1. Add "use client" (because Session is a client component)
import { ReactNode } from "react";
import AccountNavigation from "./Navigation";
import Session from "./Session"; // 2. Import the new Session component

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    // 3. Wrap your layout in the <Session> component
    <Session>
      <div id="wd-account" className="p-3">
        <div className="d-flex">
          {/* Sidebar (hidden on small screens, like the textbook) */}
          <div className="d-none d-md-block me-4">
            <AccountNavigation />
          </div>

          {/* Main content */}
          <div className="flex-fill" style={{ maxWidth: 720 }}>
            {children}
          </div>
        </div>
      </div>
    </Session>
  );
}