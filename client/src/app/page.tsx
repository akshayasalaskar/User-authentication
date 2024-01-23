"use client";

import { isLogin, logOut } from "../../src/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const [pageReady, setPageReady] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      // Assuming isLogin() returns an object with 'auth' and 'data' properties
      const loggedIn = await isLogin();
      // Check if the 'auth' property of loggedIn is truthy
      if (loggedIn.auth) {
        setUser(loggedIn.data);
      } else {
        router.push("/login");
      }
    };
    // Call the authenticate function when the component mounts (empty dependency array)
    authenticate();
  }, []);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <main
      className={`${
        pageReady ? "block" : "hidden"
      } w-full h-screen grid place-items-center`}
    >
      <div>
        <p>Hi {user?.name}, Welcome!</p>
        <p>{user?.email}</p>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </main>
  );
}
