/* eslint-disable */
import axios from "axios";

// CRITICAL: Creates an axios instance that sends cookies for session handling
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

// Environment variable and API base path setup
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// Signin: Uses axiosWithCredentials to send cookies
export const signin = async (credentials: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signin`,
    credentials
  );
  return response.data;
};

// Signup
export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/signup`,
    user
  );
  return response.data;
};

// Profile
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

// Signout
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};

// Update User
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};