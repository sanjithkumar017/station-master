import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCV_PzfLmpIvf5WFpWWC8GQ1POGjXdeYxs",
    authDomain: "station-master.firebaseapp.com",
    databaseURL: "https://station-master.firebaseio.com",
    projectId: "station-master",
    storageBucket: "",
    messagingSenderId: "201830164637"
};
firebase.initializeApp(config);

export default firebase