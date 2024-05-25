import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getDatabase,
  set,
  ref,
  update,
  push,
  onValue,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCqOPjdzSoBR1J0IAeng0m-6_ix4cq7qm0",
  authDomain: "connexcard-8ad69.firebaseapp.com",
  databaseURL: "https://connexcard-8ad69-default-rtdb.firebaseio.com",
  projectId: "connexcard-8ad69",
  storageBucket: "connexcard-8ad69.appspot.com",
  messagingSenderId: "245505504615",
  appId: "1:245505504615:web:b9f194a307d87de13cabc2",
  measurementId: "G-WL4TRBSPH3",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const db=getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
