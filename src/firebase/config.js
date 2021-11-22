import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyASqCzpR3jP1MGJ2VQ7qPVw6EpoRqbm5qE",
	authDomain: "cooking-ninja-project.firebaseapp.com",
	projectId: "cooking-ninja-project",
	storageBucket: "cooking-ninja-project.appspot.com",
	messagingSenderId: "66447643950",
	appId: "1:66447643950:web:dffcf85884d16486de16bf",
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }
