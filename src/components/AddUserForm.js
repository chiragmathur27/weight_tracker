import React, { useState } from "react";
import { firebase } from "../firebase";

function AddUserForm() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("users-weight")
      .add({
        name: name,
        weight: weight,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setName("");
        setWeight(0);
      });
  };

  return (
    <form className="flex ">
      <div className="mt-10 mx-auto h-30 flex space-x-4 gap-2 p-4 ">
        <div class="-space-y-px w-80 mx-auto rounded-md shadow-sm">
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Name:
          </label>
          <input
            type="text"
            value={name}
            autoFocus
            className="relative
             block w-full  shadow-md rounded-md 
             rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm required
            "
            required
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="w-96  items-center">
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Weight:
          </label>
          <input
            type="text"
            value={weight}
            required
            className="relative block w-full  shadow-md rounded-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm required"
            onChange={(e) => setWeight(e.currentTarget.value)}
          />
        </div>

        <button
          onClick={onSubmit}
          type="button"
          className=" w-32 h-12 mt-4 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          + Add
        </button>
      </div>
    </form>
  );
}

export default AddUserForm;
