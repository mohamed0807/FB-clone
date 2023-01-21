import Image from "next/image";
import React from "react";
import {
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";

const Post = ({ name, image, email, message, postImage, timestamp }) => {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
        <div className="flex space-x-2 items-center">
          <Image
            src={image}
            width={40}
            height={40}
            alt="img"
            className="rounded-full"
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}{" "}
            </p>
          </div>
        </div>
        <p className="pt-4">{message} </p>
      </div>
      {postImage && (
        <div className="relative h-56 md:h-56 bg-white">
          <img alt="" src={postImage}
          //  layout="fill"
            // objectFit="cover"
            className="h-48"
             />
        </div>
      )}
      <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
        <div className="InputIcon rounded-none rounded-bl-2xl ">
          <HandThumbUpIcon className="h-4" />
          <p className="text-xs sm:text-base">Like</p>
        </div>
        <div className="InputIcon rounded-none">
          <ChatBubbleOvalLeftIcon className="h-4" />
          <p className="text-xs sm:text-base">Comment</p>
        </div>
        <div className="InputIcon rounded-none rounded-br-2xl">
          <ShareIcon className="h-4" />
          <p className="text-xs sm:text-base">Share</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
