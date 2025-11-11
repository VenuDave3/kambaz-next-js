'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { ReactNode } from 'react';
import KambazNavigation from './Navigation';

// 1. Import the Provider and the new store
import store from "./store";
import { Provider } from "react-redux";

export default function KambazLayout({ children }: { children: ReactNode }) {
  return (
    // 2. Wrap your main div in the Provider
    <Provider store={store}>
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
    </Provider>
  );
}