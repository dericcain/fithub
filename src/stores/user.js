import { store } from 'react-easy-state';
import { firebase } from '@react-native-firebase/firestore';

// Maybe we need to move more logic here regarding the user, i.e., login and such
export const User = store({
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  bio: '',
  isAvailable: true,
  isTrainer: false,
  postalCode: '',
  hours: {
    sunday: {
      start: '',
      end: '',
    },
    monday: {
      start: '',
      end: '',
    },
    tuesday: {
      start: '',
      end: '',
    },
    wednesday: {
      start: '',
      end: '',
    },
    thursday: {
      start: '',
      end: '',
    },
    friday: {
      start: '',
      end: '',
    },
    saturday: {
      start: '',
      end: '',
    },
  },
  get toJs() {
    return {
      uid: User.uid,
      displayName: User.displayName,
      email: User.email,
      photoURL: User.photoURL,
      bio: User.bio,
      isAvailable: User.isAvailable,
      isTrainer: User.isTrainer,
      postalCode: User.postalCode,
      hours: User.hours,
    };
  },
  get isAuthed() {
    return !!User.uid;
  },
  setUser({
    uid,
    displayName,
    email,
    photoURL,
    bio,
    isAvailable,
    isTrainer,
    postalCode,
    availability,
  }) {
    User.uid = uid;
    User.displayName = displayName;
    User.email = email;
    User.photoURL = photoURL;
    User.bio = bio;
    User.isAvailable = isAvailable;
    User.isTrainer = isTrainer;
    User.postalCode = postalCode;
    User.availability = availability;
  },
  setPostalCode(postalCode) {
    User.postalCode = postalCode;
  },
  async createTrainer() {
    try {
      User.isTrainer = true;
      // Not sure why we need to set this but it is ending up undefined for some reason
      User.isAvailable = true;
      await firebase
        .firestore()
        .collection('users')
        .doc(User.uid)
        .set(User.toJs);
    } catch (error) {
      throw new Error(error);
    }
  },
  async createTrainee() {
    try {
      User.isTrainer = false;
      // Not sure why we need to set this but it is ending up undefined for some reason
      User.isAvailable = true;
      await firebase
        .firestore()
        .collection('users')
        .doc(User.uid)
        .set(User.toJs);
    } catch (error) {
      throw new Error(error);
    }
  }
});
