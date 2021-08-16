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
        <div className="w-96 flex h-12 space-x-2 items-center">
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Name:
          </label>
          <input
            type="text"
            value={name}
            autoFocus
            required
            className="w-50 mb-2 p-2 border border-gray-300 rounded mt-1 "
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="w-96 flex h-12 space-x-2 items-center">
          <label className="text-sm font-bold text-gray-600 block mb-1">
            Weight:
          </label>
          <input
            type="text"
            value={weight}
            required
            className="w-50 mb-2 p-2 border border-gray-300 rounded mt-1 "
            onChange={(e) => setWeight(e.currentTarget.value)}
          />
        </div>
        <button
          onClick={onSubmit}
          type="button"
          className="py-2
          px-4 w-18 h-10 flex justify-center  bg-blue-600 hover:bg-blue-700 text-white text-center text-base
          item items-center
          font-semibold shadow-md rounded-lg mx-auto"
        >
          + Add
        </button>
      </div>
    </form>
  );
}

export default AddUserForm;
