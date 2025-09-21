import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />

      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/2345" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Node.js" />
            <div>
              <h5> CS2345 Node.js </h5>
              <p className="wd-dashboard-course-title">Server-side JavaScript</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Express" />
            <div>
              <h5> CS3456 Express & APIs </h5>
              <p className="wd-dashboard-course-title">RESTful services</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4567" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="MongoDB" />
            <div>
              <h5> CS4567 MongoDB </h5>
              <p className="wd-dashboard-course-title">NoSQL databases</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="TypeScript" />
            <div>
              <h5> CS5678 TypeScript </h5>
              <p className="wd-dashboard-course-title">Typed JS at scale</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/6789" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Next.js" />
            <div>
              <h5> CS6789 Next.js </h5>
              <p className="wd-dashboard-course-title">Full-stack React framework</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/7890" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Capstone" />
            <div>
              <h5> CS7890 Full-Stack Capstone </h5>
              <p className="wd-dashboard-course-title">Project-based learning</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
