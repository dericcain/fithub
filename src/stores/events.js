import { store } from 'react-easy-state';
import { firebase } from '@react-native-firebase/firestore';
import { format } from 'date-fns';

const FORMAT = 'yyyy-MM-dd';
const FORMAT_TIME = 'h:mma';

export const Events = store({
  events: {},
  addEvent(day, event) {
    if (day in Events.events) {
      Events.events[day].push(event);
    } else {
      Events.events[day] = [event];
    }
  },

  fetchEvents(userId) {
    firebase
      .firestore()
      .collection('events')
      .where('userId', '==', userId)
      .get()
      .then(r => {
        if (!r.empty) {
          Events.events = {};
          r.forEach(d => {
            const event = d.data();
            const day = format(new Date(event.startTime.toDate()), FORMAT);
            const e = {
              name: event.name,
              allDayEvent: false,
              startTime: format(
                new Date(event.startTime.toDate()),
                FORMAT_TIME,
              ),
              endTime: format(new Date(event.endTime.toDate()), FORMAT_TIME),
              participant: event.participant,
              price: event.price,
            };
            Events.addEvent(day, e);
          });
        }
      })
      .catch(e => {
        throw new Error(e);
      });
  },
  fetchTraineeEvents(displayName) {
    firebase
      .firestore()
      .collection('events')
      .where('participant', '==', displayName)
      .get()
      .then(r => {
        if (!r.empty) {
          Events.events = {};
          r.forEach(d => {
            const event = d.data();
            const day = format(new Date(event.startTime.toDate()), FORMAT);
            const e = {
              name: event.name,
              allDayEvent: false,
              startTime: format(
                new Date(event.startTime.toDate()),
                FORMAT_TIME,
              ),
              endTime: format(new Date(event.endTime.toDate()), FORMAT_TIME),
              participant: event.participant,
              price: event.price,
              trainer: event.trainer,
              description: event.description,
              trainerAvatar: event.trainerAvatar,
            };
            Events.addEvent(day, e);
          });
        }
      });
  },
});
