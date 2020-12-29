import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAKiNd4YBTnaeJatCIH8rSxNS98HWwGJ5U",
  authDomain: "tic-cusco.firebaseapp.com",
  projectId: "tic-cusco",
  storageBucket: "tic-cusco.appspot.com",
  messagingSenderId: "87772616910",
  appId: "1:87772616910:web:a14a79a63ee77e1f4d989f",
  measurementId: "G-VV52Z4Q275"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
