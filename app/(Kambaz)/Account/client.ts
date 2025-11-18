/* eslint-disable */
import axios from "axios";

// 1. Create a new axios instance that sends cookies (from 5.3.3.2)
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// 2. Define the base URL for your user API (from 5.3.2.1)
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// 3. signin function (from 5.3.2.1)
export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

// 4. signup function (from 5.3.2.2)
export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    user
  );
  return response.data;
};

// 5. profile function (from 5.3.2.4)
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

// 6. signout function (from 5.3.2.5)
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

// 7. updateUser function (from 5.3.2.3)
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};