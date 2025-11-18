/* eslint-disable */
// In your React/Next.js project
import axios from "axios";

// Create an axios instance that includes credentials (cookies)
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

// Get all assignments for a course
export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

// Create a new assignment
export const createAssignment = async (courseId: string, assignment: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

// Delete an assignment
export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${assignmentId}`
  );
  return response.data;
};

// Update an assignment
export const updateAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return response.data;
};

// (Optional, but good for the editor)
// Get a single assignment by its ID
export const findAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};