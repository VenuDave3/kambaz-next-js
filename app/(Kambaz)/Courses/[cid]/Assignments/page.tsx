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
        </li>

        {/* Add a few more list items so you have a list */}
        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/124`}
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href={`/Courses/${cid}/Assignments/125`}
            className="wd-assignment-link"
          >
            A3 - JS + REACT
          </Link>
        </li>
      </ul>
    </div>
  );
}
