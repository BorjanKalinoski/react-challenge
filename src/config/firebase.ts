import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyATsDsBELWTrL-BAkO5bsKskivC4HnjZ90',
  authDomain: 'react-challenge-5c3eb.firebaseapp.com',
  projectId: 'react-challenge-5c3eb',
  storageBucket: 'react-challenge-5c3eb.appspot.com',
  messagingSenderId: '693071717387',
  appId: '1:693071717387:web:a92b26ff0e78eef407530e',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();

////////
//TYPES
////////
export type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export default firebaseApp;
