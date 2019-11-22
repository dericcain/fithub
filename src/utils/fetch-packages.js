import { firebase } from '@react-native-firebase/firestore';
import { User } from '../stores/user';
import { Packages } from '../stores/packages';

export const fetchPackages = () => {
  firebase
    .firestore()
    .collection('sessions')
    .where('userId', '==', User.uid)
    .get()
    .then(r => {
      if (!r.empty) {
        r.forEach(p => {
          Packages.addSession({ uid: p.id, ...p.data() });
        });
      }
    });
};
