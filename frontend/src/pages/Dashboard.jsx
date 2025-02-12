import React from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <main className="container mx-auto p-4">
        <Balance amount={5000} />
        <div className="mt-8">
          <Users />
        </div>
      </main>
    </div>
  );
}