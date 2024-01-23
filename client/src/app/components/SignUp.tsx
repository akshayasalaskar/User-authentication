"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa6";
import { baseURL } from "../../utils/constant";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isLogin } from "../../utils/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
    };
    axios
      .post(`${baseURL}/signup`, payload)
      .then((res) => {
        toast.success(
          <div>
            Account Created Successfully <br /> Please Login in
          </div>
        );
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <>
      <div
        className={`${pageReady ? "block" : "hidden"} grid grid-cols-[30%,1fr]`}
      >
        <div>
          <div>
            <h2>Welcome Back!</h2>
            <div className="text-[#eeeeee] w-fit mx-auto">
              <p>To keep connected with us please</p>
              <p>please login with your personal info</p>

              <Link href="/login">
                <button className="uppercase px-4 py-2 w-[100%] rounded-full border-2 mt-8">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1>Create Account</h1>

            <p className="pt-8 text-[13px] text-gray-400">
              Or use your email account for registration.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input__style"
                type="text"
                placeholder="Name"
                required
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input__style"
                type="email"
                placeholder="Email"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input__style"
                type="password"
                placeholder="Password"
                required
              />

              <button className="uppercase bg-accent hover:bg-accentDark px-4 py-2 text-white mt-4">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
