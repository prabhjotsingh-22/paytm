import React, { useState } from "react";
import { Appbar } from "../components/Appbar";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const id = searchParams.get("id");
  const name = searchParams.get("name") || "Your Friend's Name";

  return (
    <div className="min-h-screen bg-gray-50">
      <Appbar />
      <main className="container mx-auto flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-md p-6">
          <Heading
            text="Send Money"
            className="text-center mb-6 "
          />
          <div className="flex flex-col items-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex justify-center items-center text-gray-600 text-lg font-medium ">
              {name[0].toUpperCase()}
            </div>
            <h3
              className={`mt-3 text-lg ${
                name === "Your Friend's Name"
                  ? "text-gray-400"
                  : "text-gray-700"
              } font-medium`}
            >
              {name}
            </h3>
          </div>
          <div className="mb-6">
            <InputBox
              label="Amount"
              placeholder="Enter amount (₹)"
              type="number"
              onChange={(e) => {
                setAmount(e.target.value)
              }} 
            />
          </div>
          <Button
            label="Send Money"
            onClick={() => {
              axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount
              }, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              })
            }}
            className="w-full py-3"
          />
        </div>
      </main>
    </div>
  );
}
