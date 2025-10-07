'use client';
import { Table } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

export default function PeopleTable() {
  return (
    <div id="wd-people-table" className="p-2">
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {/* Tony Stark */}
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Tony</span>{' '}
              <span className="wd-last-name">Stark</span>
            </td>
            <td className="wd-login-id">001234561S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-01</td>
            <td className="wd-total-activity">10:21:32</td>
          </tr>

          {/* Bruce Wayne */}
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Bruce</span>{' '}
              <span className="wd-last-name">Wayne</span>
            </td>
            <td className="wd-login-id">001234562B</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2020-10-08</td>
            <td className="wd-total-activity">08:12:03</td>
          </tr>

          {/* Steve Rogers */}
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Steve</span>{' '}
              <span className="wd-last-name">Rogers</span>
            </td>
            <td className="wd-login-id">001234563R</td>
            <td className="wd-section">S102</td>
            <td className="wd-role">TA</td>
            <td className="wd-last-activity">2020-10-12</td>
            <td className="wd-total-activity">05:44:51</td>
          </tr>

          {/* Natasha Romanoff */}
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Natasha</span>{' '}
              <span className="wd-last-name">Romanoff</span>
            </td>
            <td className="wd-login-id">001234564N</td>
            <td className="wd-section">S102</td>
            <td className="wd-role">INSTRUCTOR</td>
            <td className="wd-last-activity">2020-10-15</td>
            <td className="wd-total-activity">22:09:18</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
