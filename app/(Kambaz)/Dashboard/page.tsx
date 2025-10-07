'use client';
import Link from 'next/link';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from 'react-bootstrap';

export default function Dashboard() {
  return (
    <div id="wd-dashboard" className="p-3">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        {/* 
          xs={1}: 1 column on phones
          md={5}: 5 columns layout base — but each Col is fixed ~300px so they wrap naturally
          g-4: gap creates ~24px spacing; we’ll add a small CSS tweak to hit ~30–40px
        */}
        <Row xs={1} md={5} className="g-4 wd-dashboard-row">
          {/* Course 1 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: '100px' }}
                  >
                    Full Stack software developer
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 2 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/node.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS2500 Node & Express
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: '100px' }}>
                    Build REST APIs with Express and middleware patterns.
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 3 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/java.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS1800 Java OOP
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: '100px' }}>
                    Classes, inheritance, interfaces, and design principles.
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 4 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/python.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS1200 Python Fundamentals
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: '100px' }}>
                    Data structures, functions, and scripting essentials.
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 5 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/db.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS3200 Databases
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: '100px' }}>
                    SQL, schema design, and relational modeling.
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 6 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/ai.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS4100 Intro to AI
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: '100px' }}>
                    Search, heuristics, and basic machine learning ideas.
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 7 */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/uiux.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS3300 UI/UX
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: '100px' }}>
                    Interaction design, accessibility, and usability testing.
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>

          {/* Course 8 (extra beyond 7) */}
          <Col className="wd-dashboard-course">
            <Card>
              <Link
                href="/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <CardImg variant="top" src="/images/devops.jpg" width="100%" height={160} />
                <CardBody>
                  <CardTitle className="text-nowrap overflow-hidden">
                    CS4500 DevOps
                  </CardTitle>
                  <CardText className="overflow-hidden" style={{ height: '100px' }}>
                    CI/CD, containers, and cloud deployment workflows.
                  </CardText>
                  <Button variant="primary">Go</Button>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
