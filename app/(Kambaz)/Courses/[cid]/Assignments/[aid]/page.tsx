'use client';
import { use } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Button, Card, Form } from 'react-bootstrap';

export default function EditAssignmentPage({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid, aid } = use(params);

  const [name, setName] = useState('A1');
  const [points, setPoints] = useState(100);
  const [group, setGroup] = useState('ASSIGNMENTS');
  const [displayAs, setDisplayAs] = useState('Percentage');
  const [submissionType, setSubmissionType] = useState('Online');
  const [due, setDue] = useState('2024-05-13T23:59');
  const [availFrom, setAvailFrom] = useState('2024-05-06T00:00');
  const [until, setUntil] = useState('');

  return (
    <div id="wd-assignment-editor" className="p-3">
      {/* (optional) show which course/assignment you’re editing */}
      <h3 className="mb-3">Edit Assignment {aid} · Course {cid}</h3>

      {/* one centered, vertical column like the screenshot */}
      <div className="wd-editor-container mx-auto">
        <Form>
          {/* Assignment Name */}
          <Form.Group className="mb-3" controlId="wd-assignment-name">
            <Form.Label className="fw-semibold">Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          {/* Description box */}
          <Form.Group className="mb-4" controlId="wd-assignment-description">
            <Card className="border-secondary-subtle">
              <Card.Body className="p-3">
                <p className="mb-2">
                  The assignment is{' '}
                  <Link href="#" className="text-danger">available online</Link>
                </p>
                <p className="mb-2">
                  Submit a link to the landing page of your Web application running on{' '}
                  <Link href="#" className="text-danger">Netlify</Link>.
                </p>
                <p className="mb-2">The landing page should include the following:</p>
                <ul className="mb-2">
                  <li>Your full name and section</li>
                  <li>Links to each of the lab assignments</li>
                  <li>Link to the Kambaz application</li>
                  <li>Links to all relevant source code repositories</li>
                </ul>
                <p className="mb-0">
                  The Kambaz application should include a link to navigate back to the landing page.
                </p>
              </Card.Body>
            </Card>
          </Form.Group>

          {/* Points */}
          <Form.Group className="mb-3" controlId="wd-assignment-points">
            <Form.Label className="fw-semibold">Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value || '0', 10))}
            />
          </Form.Group>

          {/* Assignment Group */}
          <Form.Group className="mb-3" controlId="wd-assignment-group">
            <Form.Label className="fw-semibold">Assignment Group</Form.Label>
            <Form.Select value={group} onChange={(e) => setGroup(e.target.value)}>
              <option>ASSIGNMENTS</option>
              <option>QUIZZES</option>
              <option>EXAMS</option>
            </Form.Select>
          </Form.Group>

          {/* Display Grade as */}
          <Form.Group className="mb-4" controlId="wd-assignment-display-as">
            <Form.Label className="fw-semibold">Display Grade as</Form.Label>
            <Form.Select
              value={displayAs}
              onChange={(e) => setDisplayAs(e.target.value)}
            >
              <option>Percentage</option>
              <option>Points</option>
              <option>Complete/Incomplete</option>
            </Form.Select>
          </Form.Group>

          {/* Submission Type card */}
          <Form.Group className="mb-4" controlId="wd-assignment-submission-type">
            <Form.Label className="fw-semibold">Submission Type</Form.Label>
            <Card className="border-secondary-subtle">
              <Card.Body>
                <Form.Select
                  className="mb-3"
                  value={submissionType}
                  onChange={(e) => setSubmissionType(e.target.value)}
                >
                  <option>Online</option>
                  <option>On Paper</option>
                  <option>No Submission</option>
                </Form.Select>

                <div className="small text-muted mb-2">Online Entry Options</div>
                <div className="d-grid gap-2">
                  <Form.Check type="checkbox" id="wd-entry-text" label="Text Entry" />
                  <Form.Check type="checkbox" id="wd-entry-url" label="Website URL" defaultChecked />
                  <Form.Check type="checkbox" id="wd-entry-media" label="Media Recordings" />
                  <Form.Check type="checkbox" id="wd-entry-annotation" label="Student Annotation" />
                  <Form.Check type="checkbox" id="wd-entry-files" label="File Uploads" />
                </div>
              </Card.Body>
            </Card>
          </Form.Group>

          {/* Assign card */}
          <Form.Group className="mb-4" controlId="wd-assignment-assign">
            <Form.Label className="fw-semibold">Assign</Form.Label>
            <Card className="border-secondary-subtle">
              <Card.Body>
                <Form.Label className="fw-semibold d-block mb-2">Assign to</Form.Label>
                <Form.Control className="mb-3" value="Everyone" readOnly />

                <Form.Label className="fw-semibold">Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  className="mb-3"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                />

                <div className="d-flex gap-3 flex-column flex-sm-row">
                  <div className="flex-fill">
                    <Form.Label className="fw-semibold">Available from</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={availFrom}
                      onChange={(e) => setAvailFrom(e.target.value)}
                    />
                  </div>
                  <div className="flex-fill">
                    <Form.Label className="fw-semibold">Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={until}
                      onChange={(e) => setUntil(e.target.value)}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Form.Group>

          {/* Footer buttons */}
          <div className="d-flex justify-content-end gap-2">
            <Button type="button" variant="light" className="border">Cancel</Button>
            <Button type="submit" variant="danger">Save</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
