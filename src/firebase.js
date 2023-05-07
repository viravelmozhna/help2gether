import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import store from './store';

const firebaseConfig = {
  apiKey: 'AIzaSyA7jP2FD-YA9RClr7yxoJngzVAO_WlA1Zk',
  authDomain: 'help2gether-a15a6.firebaseapp.com',
  databaseURL:
    'https://help2gether-a15a6-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'help2gether-a15a6',
  storageBucket: 'help2gether-a15a6.appspot.com',
  messagingSenderId: '773867655973',
  appId: '1:773867655973:web:af94f40e3012c5af0e40cc',
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// The function to check is user logged in or not before enter to routes
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject,
    );
  });
};

// Checking is user logged in or not and setting his data to the store
onAuthStateChanged(auth, (user) => {
  const { currentUser } = auth;
  if (currentUser) {
    store.dispatch('setUser', {
      email: currentUser.email,
      id: currentUser.uid,
    });
  }
});
