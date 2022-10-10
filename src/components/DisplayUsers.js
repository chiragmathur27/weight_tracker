import React, { useEffect, useState } from "react";
import { firebase } from "../firebase";
import { MdDelete } from "react-icons/md";
import { BiPencil } from "react-icons/bi";
import Modal from "./Modal";

function useWeights() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users-weight")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const newUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(newUsers);
      });
    return () => unsubscribe();
  }, []);
  return users;
}

function DisplayUsers() {
  const users = useWeights();

  const [currentId, setCurrentId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const deleteUser = (id) => {
    firebase.firestore().collection("users-weight").doc(id).delete();
  };

  return (
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6">


      <h2 className="font-bold text-center text-xl">Users</h2>
      <div>
        <table className="max-w-5xl my-5 mx-auto table-auto">
          <thead className="justify-between">
            <tr className="bg-blue-800">
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">Name</span>
              </th>
              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold">Weight</span>
              </th>

              <th className="px-16 py-2">
                <span className="text-gray-100 font-semibold"></span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-200 ">
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b-2 border-gray-200">
                <td className="px-10 py-2 flex flex-row items-center">
                  <span className="text-center ml-2 font-semibold">
                    {user.name}
                  </span>
                </td>

                <td className="px-16 py-2">
                  <span>{user.weight}</span>
                </td>
                <td className="flex items-center space-x-2">
                  <MdDelete
                    className="cursor-pointer"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  />
                  <BiPencil
                    className="cursor-pointer"
                    onClick={() => {
                      setCurrentId(user.id);
                      setShowModal(true);
                    }}
                  />
                  {showModal && (
                    <Modal
                      currentId={currentId}
                      showModal
                      onClose={() => setShowModal(false)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default DisplayUsers;
