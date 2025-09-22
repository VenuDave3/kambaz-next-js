import Link from "next/link";

export default function Assignments({
  params,
}: {
  params: { cid: string };
}) {
  const { cid } = params;

  return (
    <div id="wd-assignments">
      <input
        placeholder="Search for Assignments"
        id="wd-search-assignment"
      />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/123`}
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <div>
            <span>Multiple Modules</span> <br />
            <strong>Not available until</strong> May 6 @ 12:00am <br />
            <strong>Due</strong> May 13 @ 11:59pm <br />
            <strong>100 pts</strong>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/124`}
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div>
            <span>Multiple Modules</span> <br />
            <strong>Not available until</strong> May 13 @ 12:00am <br />
            <strong>Due</strong> May 20 @ 11:59pm <br />
            <strong>100 pts</strong>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/125`}
            className="wd-assignment-link"
          >
            A3 - JS + REACT
          </Link>
          <div>
            <span>Multiple Modules</span> <br />
            <strong>Not available until</strong> May 20 @ 12:00am <br />
            <strong>Due</strong> May 27 @ 11:59pm <br />
            <strong>100 pts</strong>
          </div>
        </li>
      </ul>
    </div>
  );
}
