import axios from "axios";
import { useEffect, useState } from "react";


export const History=({userdata})=>{
const [historyData,setHistoryData]=useState([])

const VITE_BACKEND_URL=import.meta.env.VITE_BACKEND_URL;
  // History Data Fetch
const HistroyData = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/api/history/view`);
     const latestFirst = res.data.response.slice().reverse();
      setHistoryData(latestFirst);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    HistroyData();
  }, [userdata]);

 
    return (
  <>

     <div className="max-w-3x mx-auto">
        <h2 className="pt-5 font-semibold text-center text-black-700">Claim History</h2>
       <div className="max-h-[200px] overflow-y-auto overflow-x-hidden pr-2">
        <ul className="space-y-1">
          {
            historyData.map((item) => (
              <li
                key={item._id}
                className="bg-white shadow-md p-1 rounded-[4px] border border-gray-200 hover:shadow-lg transition duration-200 flex justify-between items-center" // Added flex classes
              >
                <div className="flex flex-col pl-2">
                  <p className="text-black-900 text-[13px]">
                    {item.userid?.name || "Unknown User"}
                  </p>
                  <p className="text-gray-900 text-[8px]">
                    ID: {item._id.substring(0, 10)}...
                  </p>
                </div>
                {/* Right side: Points */}
                <div className="flex-shrink-0 pr-2"> 
                  <p className="text-green-600 font-bold text-x"> 
                    {item.point}
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
        </div>
      </div>

    </>
    )}