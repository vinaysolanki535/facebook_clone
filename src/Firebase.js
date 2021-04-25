import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyB4oLVgEhZW7TZlq-VUrDJYvu6K_BXwZ4Q',
  authDomain: 'facebook-c32b8.firebaseapp.com',
  projectId: 'facebook-c32b8',
  storageBucket: 'facebook-c32b8.appspot.com',
  messagingSenderId: '885747425080',
  appId: '1:885747425080:web:492a213ab3bb2943772bcd',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
var storageRef = firebase.storage().ref()
export { db, auth, provider, storageRef }
export default db
