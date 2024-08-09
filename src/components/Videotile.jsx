import React from "react";

const Videotile = ({
  name,
  thumbnail,
  logo,
  uploadTime,
  duration,
  channel,
  views,
}) => {
  return (
    <div className=" font-bold">
      <div className="relative w-full">
        <img
          src={thumbnail}
          alt=""
          className="h-full w-full overflow-hidden rounded-2xl"
        />
        <p className="absolute right-2 top-[85%] px-1 text-xs bg-yt-black text-yt-white rounded">
          {duration}
        </p>
      </div>
      <div className="pt-4 flex">
        <img className="rounded-full size-10 mt-0" src={logo} alt="" />
        <div className="ml-4 text-yt-gray">
          <h2 className="text-yt-white">{name.length <=50 ? name : `${name.substr(0, 50)}...`}</h2>
          <p className="hover:text-yt-white" >{channel}</p>
          <p>
            {views} views • {uploadTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Videotile;
