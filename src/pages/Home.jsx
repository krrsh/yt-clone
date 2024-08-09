import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { CategoryItems } from "../static/data";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Link } from 'react-router-dom'
import Videotile from "../components/Videotile";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const Home = () => {
    const [activetxt, setActivetxt] = useState("All");
    const [videos, setVideos] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        const q = query(collection(db, "video"));
        onSnapshot(q, (snapShot) => {
          setVideos(
            snapShot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          );
        });
    },[]);

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){dispatch(setUser(user))}
        else{
          dispatch(setUser(null))
        }
      } )
    },[])


  return (
    <>
      <Sidebar />
      <div className="scrollbar-hide flex ml-72 bg-yt-black p-2 pl-10 w-[calc(100%)] overflow-x-scroll">
        <div className="flex text-yt-white mt-14 h-14">
          {CategoryItems.map((item, i) => {
            return (
              <div
                key={i}
                className={`rounded-xl hover:bg-yt-gray  ${item === activetxt ? "bg-yt-gray" : "bg-yt-light-black"} mr-8 mb-4 p-4 flex items-center justify-center whitespace-nowrap hover:cursor-pointer`}
                onClick={()=>setActivetxt(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-yt-black h-[100%]">
        <div className=" px-5 grid grid-cols-yt gap-x-3 gap-y-8 ml-72 pl-10">
            {videos.map((video, i)=>(
                <Link to={`/video/${video.id}`} key={video.id}>
                    <Videotile {...video}></Videotile>
                </Link>
            ))}
        </div>
        </div>
    </>
  );
};

export default Home;
