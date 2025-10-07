'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AccountNavigation() {
  const pathname = usePathname();
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
      {Item('/Account/Signin', 'wd-account-signin-link', 'Signin')}<br/>
      {Item('/Account/Signup', 'wd-account-signup-link', 'Signup')}<br/>
      {Item('/Account/Profile', 'wd-account-profile-link', 'Profile')}<br/>
    </div>
  );
}
