// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0tST5r8-Q3GrWqgVIt9OfbOGaBKK5uTU",
  authDomain: "usdt-farmer.firebaseapp.com",
  projectId: "usdt-farmer",
  storageBucket: "usdt-farmer.appspot.com",
  messagingSenderId: "869442827384",
  appId: "1:869442827384:web:fbeadede74af36076ca98d",
  measurementId: "G-2NGXDT4GW6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export { analytics };

