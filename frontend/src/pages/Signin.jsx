import React from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Heading text="Sign In" />
        <SubHeading text="Enter your credentials to access your account" />
        <InputBox label="Email" placeholder="johndoe@example.com" type="email" />
        <InputBox label="Password" placeholder="********" type="password" />
        <Button label="Sign In" onClick={() => {}} />
        <div className="py-2 text-sm flex justify-center">
          <div>Don't have an account?</div>
          <Link to="/signup" className="underline pl-1 cursor-pointer text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}