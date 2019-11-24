import { store } from 'react-easy-state';
import { firebase } from '@react-native-firebase/firestore';

// Maybe we need to move more logic here regarding the user, i.e., login and such
export const User = store({
  uid: '',
  displayName: '',
  email: '',
  // This is the default avatar for a user...
  photoURL:
    'https://p125.p0.n0.cdn.getcloudapp.com/items/NQue6PPE/default-avatar.png?v=d582c75d7a94a7291ea546e13f745984',
  bio: '',
  specialties: [],
  isAvailable: true,
  isTrainer: false,
  postalCode: '',
  hasCompletedOnBoarding: false,
  serverAuthCode: '',
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
      hasCompletedOnBoarding: User.hasCompletedOnBoarding,
      serverAuthCode: User.serverAuthCode,
      specialties: User.specialties,
    };
  },
  get isAuthed() {
    return !!User.uid;
  },
  toggleSpecialty(s) {
    if (User.specialties.includes(s)) {
      User.removeSpecialty(s);
    } else {
      User.addSpecialty(s);
    }
  },
  addSpecialty(s) {
    User.specialties.push(s);
  },
  removeSpecialty(s) {
    User.specialties = User.specialties.filter(sp => sp !== s);
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
    hasCompletedOnBoarding,
    serverAuthCode,
    specialties,
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
    User.hasCompletedOnBoarding = hasCompletedOnBoarding;
    User.serverAuthCode = serverAuthCode;
    User.specialties = specialties || [];
  },
  setPostalCode(postalCode) {
    User.postalCode = postalCode;
  },
  async createUser(navigation, isTrainer = false) {
    try {
      User.isTrainer = isTrainer;
      // Not sure why we need to set this but it is ending up undefined for some reason
      User.isAvailable = true;
      User.hasCompletedOnBoarding = true;
      await firebase
        .firestore()
        .collection('users')
        .doc(User.uid)
        .set(User.toJs);
      if (isTrainer) {
        navigation.navigate('Trainer');
      } else {
        navigation.navigate('Trainee');
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  removeUser() {
    User.uid = '';
    User.displayName = '';
    User.email = '';
    User.photoURL = '';
    User.bio = '';
    User.isAvailable = true;
    User.isTrainer = false;
    User.postalCode = '';
    User.hasCompletedOnBoarding = false;
  },
});
export const specialties = [
  'Strength Training',
  'Weight Loss',
  'Sports Training',
  'Competition',
];
