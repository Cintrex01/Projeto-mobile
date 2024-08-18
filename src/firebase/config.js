// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB0SM7sdYTYRTgP0prVYUYeRXazaCkW54w',
  authDomain: 'satisfyingyou-9afdc.firebaseapp.com',
  projectId: 'satisfyingyou-9afdc',
  storageBucket: 'satisfyingyou-9afdc.appspot.com',
  messagingSenderId: '1004865155280',
  appId: '1:1004865155280:web:a89773d2af72c53b81eed5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth_mod = getAuth(app);

const storage = getStorage(app);

export {auth_mod, db, storage};
