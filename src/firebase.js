import firebase from '@react-native-firebase/app';

const config = {
  apiKey: 'AIzaSyDMWnjKA5yQKO8lClFJDQs_1BilmZbUU1Y',
  authDomain: 'lab-days.firebaseapp.com',
  databaseURL: 'https://lab-days.firebaseio.com',
  projectId: 'lab-days',
  storageBucket: 'lab-days.appspot.com',
  messagingSenderId: '313017879174',
  appId: '1:313017879174:web:3229379619e85063891f07',
  persistence: true,
};

export default firebase
  .initializeApp(config, 'lab-days')
  .then(() => console.log('initialized apps =>', firebase.apps));
