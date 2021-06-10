import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAYwasv7DixunUgYl915y2sxeHzSZ1mS7M",
  authDomain: "barter-system-9deeb.firebaseapp.com",
  projectId: "barter-system-9deeb",
  storageBucket: "barter-system-9deeb.appspot.com",
  messagingSenderId: "900705371864",
  appId: "1:900705371864:web:73d07919d79499f684b9ad"
};

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();  