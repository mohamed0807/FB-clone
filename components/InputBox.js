import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
// import {
//   doc,
//   getFirestore,
//   serverTimestamp,
//   setDoc,
//   updateDoc,
// } from "firebase/firestore";
import {
  collection,
  getDocs,
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { child, set } from "firebase/database";
import firebase from "firebase/compat/app";

const InputBox = () => {
  // const [session]=useSession()
  const { data: session, status } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  // console.log(db)
  const colRef = collection(db, "posts");

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");

          removeImage();
          uploadTask.on(
            "state_change",
            null,
            (error) => console.error(error),
            () => {
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  colRef.doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = "";
  };
  const [id, setId] = useState("");
  const upload = (e) => {
    e.preventDefault();
    const colRef = collection(db, "posts");
    addDoc(colRef, {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    }).then((docu) => {
      console.log("ID::", docu.id);
      const storageRef = ref(storage, `posts/${docu.id}`);
      uploadString(storageRef, imageToPost, "data_url").then((snapshot) => {
        console.log("REAL::", snapshot);
      });
      removeImage();

      const uploadTask = uploadBytesResumable(storageRef, imageToPost);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          console.log("snapshot::", snapshot);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log("Error:", error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            console.log("HERE::", docu.id);
            const cityRef = doc(db, "posts", docu.id);

            setDoc(cityRef, { postImage: downloadURL }, { merge: true });
          });
        }
      );
    });
    inputRef.current.value = "";
  };

  const posts = [];
  getDocs(colRef).then((snapshot) => {
    snapshot.docs.map((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });
  });
  console.log(posts);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 items-center  p-4">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="rounded-full h-12 w-full bg-gray-100 px-5 focus:outline-none"
            type="text"
            placeholder={`Share some thoughts ${session.user.name}`}
          />
          {/* <button hidden onClick={sendPost} type="submit"> */}
          <button hidden onClick={upload} type="submit">
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="img" />
            <p className="text-xs text-red-500 text-center">remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-between p-3 border-t">
        <div className="InputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="InputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>
        <div className="InputIcon">
          <FaceSmileIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
