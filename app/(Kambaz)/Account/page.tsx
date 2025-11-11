"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  // If no user in Redux, go to Signin
  if (!currentUser) {
    redirect("/Kambaz/Account/Signin");
  } else {
    // If user EXISTS, go to Profile
    redirect("/Kambaz/Account/Profile");
  }
}