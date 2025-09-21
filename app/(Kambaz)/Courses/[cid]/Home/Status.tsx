export default function CourseStatus() {
  return (
    <div id="wd-course-status">
      <h2>Course Status</h2>
      <button>Unpublish</button> <button>Publish</button>
      <hr />
      <h3>To Do</h3>
      <ul>
        <li>Grade Quiz 1</li>
        <li>Post Week 3 Announcement</li>
        <li>Open Project 1</li>
      </ul>
      <hr />
      <h3>Coming Up</h3>
      <ul>
        <li>Quiz 2 – Friday</li>
        <li>Lecture – Monday</li>
        <li>Office Hours – Tuesday</li>
      </ul>
      <hr />
      <button>View Course Notifications</button>
    </div>
  );
}
