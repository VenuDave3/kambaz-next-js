import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
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
  );
}
