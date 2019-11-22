import { firebase } from '@react-native-firebase/firestore';
import { store } from 'react-easy-state';

export const Packages = store({
  sessions: [],
  addSession(session) {
    Packages.sessions.push(session);
  },
  removeSession(id) {
    Packages.sessions = Packages.sessions.filter(s => s.uid !== id);
  },
  fetchPackages(userId) {
    firebase
      .firestore()
      .collection('sessions')
      .where('userId', '==', userId)
      .get()
      .then(r => {
        if (!r.empty) {
          Packages.sessions = [];
          r.forEach(p => {
            Packages.addSession({ uid: p.id, ...p.data() });
          });
        }
      });
  },
});
