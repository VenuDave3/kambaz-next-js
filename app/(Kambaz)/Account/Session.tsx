/* eslint-disable */
"use client";
import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      // 1. Try to fetch the profile from the server's session
      const currentUser = await client.profile();
      // 2. If successful, put the user in the Redux store
      dispatch(setCurrentUser(currentUser));
    } catch (err: any) {
      // 3. If it fails (401 error), do nothing. currentUser stays null.
      console.error(err);
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 4. Don't show the rest of the app until the profile check is done
  if (!pending) {
    return children;
  }
  
  // You can add a loading spinner here if you want
  return null; 
}