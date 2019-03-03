import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBoB6XNuuGXPdI0M30e4WYyHVh6zwbrmRI",
    authDomain: "steamlab-tuition.firebaseapp.com",
    databaseURL: "https://steamlab-tuition.firebaseio.com",
    projectId: "steamlab-tuition",
    storageBucket: "steamlab-tuition.appspot.com",
    messagingSenderId: "670802483420"
  };

  export function initFirebase() {
    firebase.initializeApp(config);
  }
  