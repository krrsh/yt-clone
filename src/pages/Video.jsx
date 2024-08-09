import { onSnapshot, query, doc, addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db, timestamp } from "../firebase";
import { useParams } from "react-router-dom";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal, HiDownload } from "react-icons/hi";
import { MdOutlineSort } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import Comment from "../components/Comment";
import RecommendVideo from "../components/RecommendVideo";
import {CategoryItems} from '../static/data'
import {Link} from 'react-router-dom'

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("")

  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);


  useEffect(() => {
    if (id) {
      const q = query(doc(db, "video", id));
      onSnapshot(q, (snapShot) => {
        setData(snapShot.data());
      });
      const commentsQuery = query(collection(db, "video", id, "comments"));
      onSnapshot(commentsQuery, (snapShot) => {
        setComments(
          snapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    }
  }, [id]);


  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){dispatch(setUser(user))}
      else{
        dispatch(setUser(null))
      }
    } )
  },[])

  useEffect(() => {
    const q = query(collection(db, "video"));
    onSnapshot(q, (snapShot) => {
      setVideos(
        snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    let commentData = {
      image : user.photoURL,
      name : user.displayName,
      comment,
      uploaded : timestamp
    }
    if(id){
      await addDoc(collection(db, "video", id, "comments"), commentData);
      setComment("");
    }
  }
  

  return (
    <div className="text-yt-white bg-yt-black pt-20 h-full xl:flex">
      <div className="w-[100%]">
      <iframe
        className="flex justify-between items-center px-5 w-full h-[45vh] rounded-3xl xl:h-[75vh]"
        src={`https://www.youtube.com/embed/${data?.link}`}
        title="YouTube video player"
        style={{ border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h1 className="px-7 mt-5 font-semibold text-2xl">{data?.name}</h1>
      <div className=" 2xl:flex 2xl:items-center 2xl:justify-between p-5 mt-2">
        <div className="flex items-center">
          <img className="rounded-full h-12 w-12" src={data?.logo} alt={data?.channel} />
          <div className="pl-2">
            <h3 className="cursor-pointer text-xl">{data?.channel}</h3>{" "}
            <p className="text-yt-gray">{data?.subscribers} subscribers</p>
          </div>
          <button className="ml-4 font-medium bg-yt-light-1 hover:bg-yt-light-black rounded-3xl h-10 px-6">
            Join
          </button>
          <button className="ml-4 font-medium bg-yt-white text-yt-black rounded-3xl h-10 px-6">
            Subscribe
          </button>
        </div>
        <div className="2xl:mt-0 flex items-center gap-3 mt-6">
          <div className="flex bg-yt-light-1 rounded-3xl">
            <button className="bg-yt-light-1 hover:bg-yt-light-black px-4 rounded-l-3xl gap-3 items-center flex">
              <FaRegThumbsUp /> 92k
            </button>{" "}
            <div className="w-px bg-yt-gray h-6 my-3"></div>{" "}
            <button className="bg-yt-light-1 hover:bg-yt-light-black px-5 rounded-r-3xl ">
              <FaRegThumbsDown />
            </button>
          </div>
          <button className="bg-yt-light-1 hover:bg-yt-light-black rounded-3xl py-3 px-4 flex items-center gap-2">
            <RiShareForwardLine />
            Share
          </button>
          <button className="bg-yt-light-1 hover:bg-yt-light-black rounded-3xl py-3 px-4 flex items-center gap-2">
            <HiDownload />
            Download
          </button>
          <button className="bg-yt-light-1 hover:bg-yt-light-black rounded-3xl py-3 px-4">
            <HiDotsHorizontal />
          </button>
        </div>
      </div>
      <div className="bg-yt-light-black p-3 rounded-xl font-medium  h-fit mx-5">
        <div className="flex items-center gap-3">
          <p>{data?.views} views</p>
          <p>{data?.uploadTime}</p>
        </div>
        <div>{data?.description}</div>
      </div>
      <div className="text-yt-white m-5">
        <div className="flex items-center">
          <h1 >{comments.length} Comments</h1>
          <div className="flex items-center mx-5"> <MdOutlineSort size={22} className="mx-3"/> <h1>Sort By</h1></div>
        </div>
        {
          user && (
            <form onSubmit={addComment} className="flex items-center">
            <img className="rounded-full h-12 w-12 mt-5" src={user?.photoURL} alt="Profile" />
            <input value={comment} onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Add comments..." className="border-b w-full xl:w-[70%] mx-5 outline-none bg-[transparent] border-b-yt-gray bg-transparent"/>
            </form>
          )
        }
        <div className="mt-4">
            {comments.map((item, i) => (
              <Comment key={i} {...item} />
            ))}
          </div>
      </div>
      </div>



      <div className=" px-3 overflow-y-hidden w-1/2">
        <div>
          <div className="flex flex-row px-3 overflow-x-scroll relative scrollbar-hide">
            {CategoryItems.map((item, i) => (
              <h2
                className="text-yt-white font-normal text-sm py-2 px-4 break-keep whitespace-nowrap bg-yt-light mr-3 cursor-pointer rounded-lg hover:bg-yt-light-1"
                key={i}
              >
                {item}
              </h2>
            ))}
          </div>
        </div>
        <div className="pt-8">
          {videos.map((video, i) => {
            if (video.id !== id) {
              return (
                <Link key={i} to={`/video/${video.id}`}>
                  <RecommendVideo {...video} />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Video;
