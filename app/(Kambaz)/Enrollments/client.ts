import axios from "axios";
// IMPORTANT: Use the dedicated axios instance for session support
const axiosWithCredentials = axios.create({ withCredentials: true });

// Define necessary API constants
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const findAllEnrollments = async () => {
  // Using axiosWithCredentials for consistency, although GET might not strictly require it
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/api/enrollments`); 
  return response.data;
};

// 2. CREATE: Enroll User in a Course (Calls POST /api/users/:uid/courses/:cid)
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`, 
    {} 
  );
  return data;
};

// 3. DELETE: Unenroll User from a Course (Calls DELETE /api/users/:uid/courses/:cid)
export const unenrollUserFromCourse = async (
  userId: string,
  courseId: string
) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return data;
};