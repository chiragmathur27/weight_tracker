import React, { useState, useEffect } from "react";
import { firebase } from "../firebase";

function Modal({ showModal, onClose, currentId }) {
  const initialStateValues = {
    name: "",
    weight: "",
  };

  const [value, setValue] = useState(initialStateValues);
  const onChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  const updateItem = (id) => {
    firebase
      .firestore()
      .collection("users-weight")
      .doc(currentId)
      .update(value);
    console.log(value);
  };

  const getUser = async (id) => {
    const doc = await firebase
      .firestore()
      .collection("users-weight")
      .doc(id)
      .get();
    setValue({ ...doc.data() });
  };

  useEffect(() => {
    if (currentId === "") {
      setValue({ ...initialStateValues });
    } else {
      getUser(currentId);
    }
  }, [currentId]);

  return (
    <div>
      {showModal && (
        <>
          <form className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Update User</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto space-y-3 mt-4">
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      Name
                    </span>
                    <input
                      // value={user.name}

                      type="text"
                      name="name"
                      value={value.name}
                      onChange={onChange}
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <div className="flex relative ">
                    <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                      Weight
                    </span>
                    <input
                      // value={user.weight}
                      onChange={onChange}
                      name="weight"
                      value={value.weight}
                      type="text"
                      className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => {
                      getUser(currentId);
                      updateItem(currentId);
                    }}
                    className="text-blue-500 background-transparent font-bold uppercase px-6 pt-2 text-sm outline-none focus:outline-none ml-20 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
                {/*Footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    onClick={onClose}
                    className="text-red-500 background-transparent font-bold uppercase px-6 text-sm outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
}

export default Modal;
