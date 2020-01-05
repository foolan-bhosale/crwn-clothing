import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBTbERVKqdbLE0tSsFa19nEVn9WgyCv4KQ",
    authDomain: "crwn-db-b8cc2.firebaseapp.com",
    databaseURL: "https://crwn-db-b8cc2.firebaseio.com",
    projectId: "crwn-db-b8cc2",
    storageBucket: "crwn-db-b8cc2.appspot.com",
    messagingSenderId: "624541459708",
    appId: "1:624541459708:web:eb848d672c15070d046379",
    measurementId: "G-QTYNMGXDR0"
  };

   export const createUserProfileDocument = async ( userAuth, additionalData) =>{
     if(!userAuth) return;

     const userRef = firestore.doc(`users/${userAuth.uid}`);
     const snapShot =  await userRef.get();
     console.log(snapShot);

     if (!snapShot.exists){
       const { displayName, email} = userAuth;
       const createdAt = new Date();

       try{
         await userRef.set({
           displayName,
           email,
           createdAt,
           ...additionalData
         })
         
       } catch(error){
         console.log('error creating user', error.message)
       }
     }
      
     return userRef;
   }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;