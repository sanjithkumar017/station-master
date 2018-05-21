import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCnHkmRSEAREU88sKnpHDMKfhOSCssPBjE",
    authDomain: "station-master-15a28.firebaseapp.com",
    databaseURL: "https://station-master-15a28.firebaseio.com",
    projectId: "station-master-15a28",
    storageBucket: "",
    messagingSenderId: "477934840268"
};
firebase.initializeApp(config);

export default firebase