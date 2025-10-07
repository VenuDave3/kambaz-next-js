import { ReactNode, use } from "react";
import { FaAlignJustify } from "react-icons/fa6";
import CourseNavigation from "./Navigation";

export default function CourseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ cid: string }>;   // ✅ params is a Promise
}) {
  const { cid } = use(params);        // ✅ unwrap the Promise

  return (
    <div id="wd-courses" className="p-3">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        Course {cid}
      </h2>
      <hr />
      <div className="d-flex">
        {/* left nav: visible md+ only */}
        <div className="d-none d-md-block me-3">
          <CourseNavigation />
        </div>

        {/* main content */}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
