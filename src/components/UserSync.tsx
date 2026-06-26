"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

/**
 * UserSync — silently syncs the Clerk-authenticated user to the database.
 * Mount this once inside a layout that is wrapped by <ClerkProvider>.
 * It renders nothing visible.
 */
const UserSync = () => {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    // Wait until Clerk has finished loading and a user is signed in
    if (!isLoaded || !user) return;

    const syncUser = async () => {
      try {
        // 💡 ফ্রন্টএন্ড থেকে রোল পাঠানো বন্ধ করা হলো, যাতে ব্যাকএন্ড ডাটাবেজের রোল অক্ষত রাখে
        const payload = {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          name: user.fullName ?? "",
        };

        const isLocalhost = 
          typeof window !== "undefined" && 
          (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

        const apiUrl = isLocalhost
          ? (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000")
          : "https://skillzone-backend.vercel.app";

        const res = await fetch(`${apiUrl}/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("❌ Failed to sync user:", errorData.message);
        } else {
          console.log("✅ User synchronized successfully to database!");
        }
      } catch (err) {
        console.error("❌ UserSync network error:", err);
      }
    };

    syncUser();
  }, [isLoaded, user]);

  // This component is purely for side-effects — renders nothing
  return null;
};

export default UserSync;