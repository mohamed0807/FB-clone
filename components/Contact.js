import Image from "next/image";
import React from "react";

const Contact = ({ name, src }) => {
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:bg-gray-300 cursor-pointer p-2 rounded-xl" >
      <Image
        width={50}
        height={50}
        objectFit="cover"
        layout="fixed"
        className="rounded-full"
        src={src}
      />
      <p>{name}</p>
      <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full animate-bounce" ></div>
    </div>
  );
};

export default Contact;
