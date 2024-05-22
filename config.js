import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNIMzKOxPpBaa-ECDFd98Jge3cLPKBByc",
  authDomain: "varietyapp-90383.firebaseapp.com",
  projectId: "varietyapp-90383",
  storageBucket: "varietyapp-90383.appspot.com",
  messagingSenderId: "202169223104",
  appId: "1:202169223104:web:c864c2da1bcb740d42ea25",
  measurementId: "G-RWK4NJXENY"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
