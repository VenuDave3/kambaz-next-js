/* eslint-disable */
import axios from "axios";

// 1. Get the axios instance that sends cookies (from 5.3.3.2)
// We get this from the Account client, but we'll redefine it here
// as shown in the textbook.
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const MODULES_API = `${HTTP_SERVER}/api/modules`;
export const USERS_API = `${HTTP_SERVER}/api/users`; // (from 5.3.4.1)

// --- Course Functions (from 5.3.4) ---

// (from 5.3.4.1)
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// (from 5.3.4.1)
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

// (from 5.3.4.2)
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`, // This is the textbook's weird path
    course
  );
  return data;
};

// (from 5.3.4.3)
export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

// (from 5.3.4.4)
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// --- Module Functions (from 5.3.5) ---

// (from 5.3.5.1)
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

// (from 5.3.5.2)
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

// (from 5.3.5.3)
export const deleteModule = async (moduleId: string) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

// (from 5.3.5.4)
export const updateModule = async (module: any) => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};