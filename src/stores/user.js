import { store } from 'react-easy-state';

export const User = store({
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  get isAuthed() {
    return !!User.uid;
  },
  setUser({ uid, displayName, email, photoURL }) {
    User.uid = uid;
    User.displayName = displayName;
    User.email = email;
    User.photoURL = photoURL;
  },
  removeUser() {
    User.uid = '';
    User.displayName = '';
    User.email = '';
    User.photoURL = '';
  },
});
