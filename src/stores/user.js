import { store } from 'react-easy-state';

// Maybe we need to move more logic here regarding the user, i.e., login and such
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
