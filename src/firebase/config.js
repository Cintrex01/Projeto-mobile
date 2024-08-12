// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA9cq6t-c9Q0-ahYk2YPeOnG3Eh-EZ-zf8',
  authDomain: 'satisfying-you-e580b.firebaseapp.com',
  projectId: 'satisfying-you-e580b',
  storageBucket: 'satisfying-you-e580b.appspot.com',
  messagingSenderId: '145532510739',
  appId: '1:145532510739:web:4ba2c3b94877babe1c95e6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth_mod = getAuth(app);

const storage = getStorage(app);

export {auth_mod, app, storage};
