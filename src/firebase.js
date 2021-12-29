import firebase from 'firebase/app';
import 'firebase/auth' ;

const firebaseConfig = {
  apiKey: "AIzaSyDqF2Cqu_yEIYc5R2wjWw6YVhkSO_1x9so",
  authDomain: "e-com-e922a.firebaseapp.com",
  databaseURL: "https://e-com-e922a-default-rtdb.firebaseio.com",
  projectId: "e-com-e922a",
  storageBucket: "e-com-e922a.appspot.com",
  messagingSenderId: "23914706848",
  appId: "1:23914706848:web:247afef4588f47fcb856c5"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();