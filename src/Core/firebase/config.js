import { decode, encode } from 'base-64';
import './timerConfig';
global.addEventListener = (x) => x;
if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeSszj1maiMB6c1TmqfzbFJWrYMMA6O9U",
  authDomain: "reactdoctor-ee1eb.firebaseapp.com",
  databaseURL: "https://reactdoctor-ee1eb-default-rtdb.firebaseio.com",
  projectId: "reactdoctor-ee1eb",
  storageBucket: "reactdoctor-ee1eb.appspot.com",
  messagingSenderId: "654284662443",
  appId: "1:654284662443:web:98c46c5acaea3577bf79ee",
  measurementId: "G-8TP6VQK72K"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
