import React from "react";
import AddUserForm from "./AddUserForm";
import DisplayUsers from "./DisplayUsers";

function Hero({ handleLogout }) {
  return (
    <>
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <nav className="flex   rounded-full justify-between w-full h-16 items-center bg-blue-600 shadow-lg">
            <h1 className="font-semibold ml-8 text-xl pl-3 text-white">Weight Tracker App</h1>
            <button
              className="h-9 mr-8 w-20 font-semibold bg-white mr-3 rounded-full hover:bg-gray-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      <AddUserForm />
      <DisplayUsers />
    </>
  );
}

export default Hero;
