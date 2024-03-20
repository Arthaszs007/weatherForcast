"use client";
import { useState } from "react"; // No need for useEffect here if not used
import Link from "next/link";
import { useUserAuth } from "./auth-context"; // Assuming this is the correct path
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // TODO: Implement handleSignIn and handleSignOut functions using gitHubSignIn and firebaseSignOut from useUserAuth
  const handleSignIn=()=>{
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth,provider);
  }
  
  const handleSignOut = async()=>{
    await firebaseSignOut();
  }

  return (
    <div className="container mx-auto my-8 p-4">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          {/* TODO: Render a button that links to the weather page. Use the Next.js Link component. */}
          <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            <Link href="/weather">weather</Link>
          </button>

          {/* TODO: Render a Sign Out button that calls handleSignOut when clicked */}
          {user && (<><button onClick={handleSignOut}>sign out</button></>)}
          
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={user.photoURL} />
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Please sign in to access the weather information.</p>
          {/* TODO: Render a Sign In button that calls handleSignIn when clicked */}
          {!user && <>(<button onClick={handleSignIn}>sign in</button>)</>}
          
        </>
      )}
    </div>
  );
}
