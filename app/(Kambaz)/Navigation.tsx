'use client';
import Link from 'next/link';
import { ListGroup } from 'react-bootstrap';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoCalendarOutline } from 'react-icons/io5';
import { LiaBookSolid, LiaCogSolid } from 'react-icons/lia';
import { FaInbox, FaRegCircleUser } from 'react-icons/fa6';

export default function KambazNavigation() {
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="wd rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* NEU Logo */}
      <Link
        className="list-group-item bg-black border-0 text-center"
        id="wd-neu-link"
        href="https://www.northeastern.edu/"
        target="_blank"
      >
        <img src="/images/NEU.png" width="75" alt="Northeastern University" />
      </Link>

      <br />

      {/* Account (white icon) */}
      <Link
        href="/Account"
        id="wd-account-link"
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </Link>

      <br />

      {/* Dashboard selected (white bg + red icon/text) */}
      <Link
        href="/Dashboard"
        id="wd-dashboard-link"
        className="list-group-item active border-0 text-center text-decoration-none"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        <span className="text-danger">Dashboard</span>
      </Link>

      <br />

      <Link
        href="/Calendar"
        id="wd-calendar-link"
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </Link>

      <br />

      <Link
        href="/Inbox"
        id="wd-inbox-link"
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </Link>

      <br />

      <Link
        href="/Courses/1234/Home"
        id="wd-courses-link"
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </Link>

      <br />

      <Link
        href="/Settings"
        id="wd-settings-link"
        className="list-group-item border-0 bg-black text-center text-white text-decoration-none"
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Settings
      </Link>
    </ListGroup>
  );
}
