"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  if (!currentUser) {
    // --- THIS IS THE FIX ---
    redirect("/Account/Signin"); // Removed "/Kambaz"
  } else {
    redirect("/Account/Profile"); // Removed "/Kambaz"
    // --- END FIX ---
  }
}