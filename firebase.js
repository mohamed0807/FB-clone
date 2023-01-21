import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTy42u0whb4GDUueTwHd7KtFqmkg3CTKI",
  authDomain: "fbookclone-5e0de.firebaseapp.com",
  projectId: "fbookclone-5e0de",
  storageBucket: "fbookclone-5e0de.appspot.com",
  messagingSenderId: "1040092322134",
  appId: "1:1040092322134:web:2267a86b04ea2fc5d2def7",
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
// const storage = getStorage(app);

export {app,db,storage};
