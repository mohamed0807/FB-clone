import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { query } from "firebase/firestore";
import { collection, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

const Posts = ({ posts }) => {
  // console.log("Posts:::::", posts);
  const colRef = collection(db, "posts");
  const [realtimePosts, loading, error] = useCollection(
    query(colRef, orderBy("timestamp", "desc"))
  );
  // realtimePosts?.docs?.map((doc) => console.log("RealPP:", doc.data()));
  return (
    <>
      <div>
      {realtimePosts?.docs?.map((post)=>(
        <Post
        key={post.id}
        name={post.data().name}
        message={post.data().message}
        email={post.data().email}
        timestamp={post.data().timestamp}
        image={post.data().image}
        postImage={post.data().postImage}
        />
      ))}
    </div>
      {/* <div>
      {posts.map((post)=>(
        <Post
        key={post.id}
        name={post.name}
        message={post.message}
        email={post.email}
        timestamp={post.timestamp}
        image={post.image}
        postImage={post.postImage}
        />
      ))}
    </div> */}
    </>
  );
};

export default Posts;
