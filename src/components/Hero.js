import React from "react";
import AddUserForm from "./AddUserForm";
import DisplayUsers from "./DisplayUsers";

function Hero({ handleLogout }) {
  return (
    <>
      <nav className="flex justify-between w-full h-16 items-center bg-blue-600 shadow-lg">
        <h1 className="font-semibold text-xl pl-3">Weight Tracker App</h1>
        <button
          className="h-9 w-20 font-semibold bg-white mr-3 rounded-full hover:bg-gray-50"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      <AddUserForm />
      <DisplayUsers />
    </>
  );
}

export default Hero;
