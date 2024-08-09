import React, { useState } from "react";
import { SidebarOptions } from "../static/data.jsx";

const Sidebar = () => {
    const [active, setActive] = useState("Home");
  return (
    <div className="bg-yt-black w-72 pt-16 text-yt-white text-nowrap h-[calc(100vh)] fixed top-0 left-0 overflow-scroll scrollbar-hide">
      <div>
        {SidebarOptions.Top.map((item, index)=>{
            return <div 
            key={index}
            onClick={()=> setActive(item.name)} 
            className={`overflow-hidden py-3 mx-4 hover:cursor-pointer hover:bg-yt-light-black rounded-xl p-2 flex items-center gap-4 ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"}`}>
                <span>{item.icon}</span>
                <p>{item.name}</p>
            </div>
        })}
      </div>
      <hr className="text-yt-light-black my-6 mx-4 " />
      <div>
        {SidebarOptions.Middle.map((item, index)=>{
            return <div 
            key={index}
            onClick={()=> setActive(item.name)} 
            className={`overflow-hidden py-3 mx-4 hover:cursor-pointer hover:bg-yt-light-black rounded-xl p-2 flex items-center gap-4 ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"}`}>
                <span>{item.icon}</span>
                <p>{item.name}</p>
            </div>
        })}
      </div>
      <hr className="text-yt-light-black mt-6 mx-4" />
      <div>
        {SidebarOptions.Explore.map((item, index)=>{
            return <div 
            key={index}
            onClick={()=> setActive(item.name)} 
            className={`overflow-hidden py-3 mx-4 hover:cursor-pointer hover:bg-yt-light-black rounded-xl p-2 flex items-center gap-4 ${item.name === active ? "bg-yt-light-black" : "bg-yt-black"}`}>
                <span>{item.icon}</span>
                <p>{item.name}</p>
            </div>
        })}
      </div>
      <hr className="text-yt-light-black mt-6 mx-4" />
    </div>
  );
};

export default Sidebar;
