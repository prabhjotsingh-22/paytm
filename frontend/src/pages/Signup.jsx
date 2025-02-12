import React, { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import axios from "axios";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <Heading text="Sign Up" />
        <SubHeading text="Enter your information to create an account" />
        <InputBox onChange={e => {
          setFirstName(e.target.value)
        }} label="First Name" placeholder="John" />
        <InputBox onChange={e => {
          setLastName(e.target.value)
        }} label="Last Name" placeholder="Doe" />
        <InputBox onChange={e => {
          setUsername(e.target.value)
        }} label="Email" placeholder="prabhjot@gmail.com" />
        <InputBox onChange={e => {
          setPassword(e.target.value)
        }} label="Password" placeholder="********"/>
        <Button label="Sign Up" onClick={async () => {
          const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
            username,
            firstName,
            lastName,
            password
          })
          localStorage.setItem("token", response.data.token)
          navigate("/dashboard")
        }} />
        <div className="py-2 text-sm flex justify-center">
          <div>Already have an account?</div>
          <Link to="/signin" className="underline pl-1 cursor-pointer text-blue-600 hover:text-blue-800">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
