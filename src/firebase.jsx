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
  apiKey: "AIzaSyCv5nByNWlWZEEws9lKk6Ytsx5cuw7uCOc",
  authDomain: "wajjcard-c9993.firebaseapp.com",
  databaseURL: "https://wajjcard-c9993-default-rtdb.firebaseio.com",
  projectId: "wajjcard-c9993",
  storageBucket: "wajjcard-c9993.appspot.com",
  messagingSenderId: "276322309634",
  appId: "1:276322309634:web:7971440d6c8f5a2c7a391b",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
// export const db=getFirestore(app)
export const auth = getAuth(app);
export const storage = getStorage(app);
