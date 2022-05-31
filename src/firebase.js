import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from './store';

const firebaseConfig = {
  apiKey: 'AIzaSyA7jP2FD-YA9RClr7yxoJngzVAO_WlA1Zk',
  authDomain: 'help2gether-a15a6.firebaseapp.com',
  databaseURL: 'https://help2gether-a15a6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'help2gether-a15a6',
  storageBucket: 'help2gether-a15a6.appspot.com',
  messagingSenderId: '773867655973',
  appId: '1:773867655973:web:af94f40e3012c5af0e40cc',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
console.log('auth in firebase file ---', auth);
console.log('current user in firebase file ---', auth.currentUser);

onAuthStateChanged(auth, (user) => {
  const { currentUser } = auth;
  if (currentUser) {
    console.log('current user in onAuthStateChanged ---', currentUser);
    console.log('currentUser name in onAuthStateChanged ---', currentUser.displayName);
    console.log('currentUser email in onAuthStateChanged ---', currentUser.email);

    store.dispatch('setUser', {
      displayName: currentUser.displayName,
      email: currentUser.email,
      id: currentUser.uid,
    });
  } else {
    console.log('You are logged out');
  }
});
