'use client';
import Link from 'next/link';
import { ListGroup, ListGroupItem } from 'react-bootstrap'; // Ensure ListGroupItem is imported
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoCalendarOutline } from 'react-icons/io5';
import { LiaBookSolid, LiaCogSolid } from 'react-icons/lia';
import { FaInbox, FaRegCircleUser } from 'react-icons/fa6';
import { usePathname } from "next/navigation"; // <-- IMPORTANT: Import usePathname

export default function KambazNavigation() {
  const pathname = usePathname();

  // Data structure for navigation links, as required by the assignment (3.8.1)
  const links = [
    { label: "Dashboard", path: "/Dashboard", icon: AiOutlineDashboard },
    // As per the prompt, Courses should navigate to /Dashboard since it's the landing point for course selection
    { label: "Courses",   path: "/Dashboard", icon: LiaBookSolid }, 
    { label: "Calendar",  path: "/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",     path: "/Inbox",     icon: FaInbox },
    { label: "Labs",      path: "/Labs",             icon: LiaCogSolid },
  ];
  
  // Helper function to check if the current link is active (for dynamic highlighting)
  const getLinkClass = (label: string) => {
    // Check if the pathname includes the label (e.g., /Dashboard or /Courses/RS101/Modules)
    const isActive = pathname.includes(label); 
    
    // Apply classes for background/text color based on active state
    return `text-center border-0 
            ${isActive ? "text-danger bg-white" : "text-white bg-black"}`;
  };

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="wd rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* 1. NEU Logo Link (Remains static) */}
      <ListGroupItem id="wd-neu-link" target="_blank" href="https://www.northeastern.edu/"
        as={Link} action className="bg-black border-0 text-center">
        <img src="/images/NEU.png" width="75" alt="Northeastern University" />
      </ListGroupItem>

      {/* 2. Account Link (Custom highlighting logic) */}
      <ListGroupItem as={Link} href="/Account"
        className={getLinkClass("Account")}
      >
        <FaRegCircleUser
          // Change icon color based on active status
          className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} 
        />
        <br />
        Account
      </ListGroupItem>

      {/* 3. DYNAMICALLY GENERATED LINKS */}
      {links.map((link) => (
        <ListGroupItem 
          key={link.path + link.label} 
          as={Link} 
          href={link.path}
          // Use dynamic class helper for highlighting
          className={getLinkClass(link.label)}
        >
          {/* Render the icon component passed in the data structure */}
          {link.icon({ className: "fs-1 text-danger"})}
          <br />
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}