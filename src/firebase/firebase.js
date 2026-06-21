import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCoaoJO0R9GS0HHrby-Kc0ji_M2Dk-skOc",
  authDomain: "safar-saathi-jk.firebaseapp.com",
  projectId: "safar-saathi-jk",
  storageBucket: "safar-saathi-jk.firebasestorage.app",
  messagingSenderId: "283188863005",
  appId: "1:283188863005:web:6bc570658aedc9280aa6f4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);