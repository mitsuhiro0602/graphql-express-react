import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDxzKh7ZrFyln7BoxHHzkHUW5QHe-6H2Go",
  authDomain: "gqlreactnode06.firebaseapp.com",
  projectId: "gqlreactnode06",
  storageBucket: "gqlreactnode06.appspot.com",
  // messagingSenderId: "399913879425",
  appId: "1:399913879425:web:f10f62aabe23215375ca80"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();