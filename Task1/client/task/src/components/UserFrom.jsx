import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { History } from "./History";

export const UserForm = () => {
  const [name, setName] = useState("");
  const [userdata, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
const VITE_BACKEND_URL=import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // VALIDATION FOR EMPTY NAME
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      const res = await axios.post(`${VITE_BACKEND_URL}/api/insert`, {
        name,
      });
      alert(res.data.msg);
      FetchUserDeta();
    } catch (e) {
      console.log(e);
    }
    setName("");
  };

  // FETCH USER DATA
  const FetchUserDeta = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/api/view`);
      const sorted = res.data.response.sort((a, b) => b.points - a.points);
      setUserData(sorted);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    FetchUserDeta();
  }, []);


  // SET CURRENT USER
  const handleListClick = (id) => {
    setSelectedUser(id);
  };

  //  REWARD CLAIM FUNTIONLITY
  const handleClaimReward = async (id) => {
    const point = Math.floor(Math.random() * 10) + 1;
    try {
      // point Update Funtionlity
      const res=await axios.put(`${VITE_BACKEND_URL}/api/point/${id}`, {
        point,
      });
      alert(res.data.msg)
      FetchUserDeta();

      // HISTORY  Collection
      await axios.post(`${VITE_BACKEND_URL}/api/history`, {
        selectedUser,
        point,
      });
      FetchUserDeta();
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-l font-semibold text-gray-800 mb-1">Leaderboard Project</h2>

   <form onSubmit={handleSubmit} className="flex items-center space-x-2">
  <input
    type="text"
    name="name"
    value={name}
    onChange={handleChange}
    className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
    placeholder="Add User by Name..."
  />

  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  >
    Submit
  </button>
</form>


      <ListComponet userdata={userdata} handleListClick={handleListClick} handleClaimReward={handleClaimReward} selectedUser={selectedUser} />
    <History userdata={userdata}/>
    </div>
  );
};

// SHOWING USER DATA AS LIST  OR LIST COMPONENT
const ListComponet = ({ userdata, handleListClick, handleClaimReward, selectedUser, }) => {
  return (
    <div className="mt-4">
      <h2 className="text-l font-semibold text-gray-800 mb-1">User List</h2>
      <h2 className="text-l font-semibold text-gray-800 mb-1">Select or Click User to Claim Reward</h2>
      {/* Showing data in slider format */}
       <div className="max-h-[350px] overflow-y-auto overflow-x-hidden pr-2">

      <ul className="space-y-1">
        {userdata.map((curr, index) => (
          <li
            key={curr._id}
            className="flex justify-between items-center px-2 py-2 bg-white shadow-md rounded-md border border-gray-200 hover:bg-gray-50 transition"
          >
            {/*Index and Name */}
            <div
              className="flex items-center gap-2"
              onClick={() => handleListClick(curr._id)}
            >
              <span className="font-bold text-gray-500">{index + 1}.</span>
              <span className="text-gray-800">{curr.name}</span>
            </div>
            {/*Points + Claim */}
            <div className="flex items-center gap-2">
              <span className="text-black-600 font-semibold">
                {curr.points}
              </span>

              {selectedUser === curr._id && (
                <span
                  onClick={() => handleClaimReward(curr._id)}
                  className="text-sm font-bold text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600 shadow-sm cursor-pointer transition"
                >
                  Claim
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>


    </div>
    </div>
  );
};


