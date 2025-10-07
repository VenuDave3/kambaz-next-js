'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { ReactNode } from 'react';
import KambazNavigation from './Navigation';

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    <div id="wd-kambaz">
      <div className="d-flex">
        <div>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3 flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}
