/* eslint-disable */
import axios from "axios";

// CRITICAL: We MUST use this instance for any route that requires 
// a logged-in session (like all CRUD operations except public reads).
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const MODULES_API = `${HTTP_SERVER}/api/modules`;
export const USERS_API = `${HTTP_SERVER}/api/users`; 

// ===================================
// === COURSE FUNCTIONS (CRUD) ===
// ===================================

// READ: Fetch all courses (Public/Unfiltered)
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// READ: Fetch courses for current user (Authenticated Filter)
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

// CREATE: Create new course (Authenticated)
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`, // Authenticated path
    course
  );
  return data;
};

// DELETE: Delete course (Authenticated)
export const deleteCourse = async (id: string) => {
  // Uses axiosWithCredentials for authentication
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

// UPDATE: Update course (Authenticated)
export const updateCourse = async (course: any) => {
  // Uses axiosWithCredentials for authentication
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// ===================================
// === MODULE FUNCTIONS (CRUD) ===
// ===================================

// READ: Fetch modules for course (Public read, usually)
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

// CREATE: Create module (Authenticated)
export const createModuleForCourse = async (courseId: string, module: any) => {
  // Uses axiosWithCredentials for authentication
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

// DELETE: Delete module (Authenticated)
export const deleteModule = async (moduleId: string) => {
  // Uses axiosWithCredentials for authentication
  const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

// UPDATE: Update module (Authenticated)
export const updateModule = async (module: any) => {
  // Uses axiosWithCredentials for authentication
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};