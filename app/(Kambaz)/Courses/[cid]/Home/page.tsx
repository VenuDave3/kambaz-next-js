'use client';
import Modules from '../Modules/page';
import CourseStatus from './Status';

export default function CourseHome() {
  return (
    <div id="wd-home">
      <div className="d-flex">
        {/* modules on the left */}
        <div className="flex-fill me-3">
          <Modules />
        </div>

        {/* course status on the right, hidden < lg */}
        <div className="d-none d-lg-block">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
