import firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDnbrcpmpergeZENH2u3k-fUtT5Kf4qjjo",
    authDomain: "askew-server.firebaseapp.com",
    databaseURL: "https://askew-server.firebaseio.com",
    projectId: "askew-server",
    storageBucket: "askew-server.appspot.com",
    messagingSenderId: "856345091020"
}

const firebase = firebaseApp.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const database = firebaseApp.database();

export {
    firebase, auth, database
}