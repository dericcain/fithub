import { GoogleSignin } from '@react-native-community/google-signin';
import { format } from 'date-fns';

const FORMAT = 'yyyy-MM-dd';
const FORMAT_TIME = 'h:mma';
const RANGE = 60;

function addIsoDays(days) {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return result;
}
const googleNow = new Date().toISOString();
const googleLater = addIsoDays(RANGE).toISOString();

export const fetchGoogleEvents = async () => {
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${googleNow}&timeMax=${googleLater}&orderBy=startTime&singleEvents=true`;
  try {
    const { accessToken } = await GoogleSignin.getTokens();
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const events = await res.json();
    return events.items.reduce((acc, { start, end, summary }) => {
      let day;
      let e = {
        name: summary,
        allDayEvent: false,
        startTime: null,
        endTime: null,
      };
      if (start.date) {
        e.allDayEvent = true;
        day = format(new Date(start.date), FORMAT);
      } else if (start.dateTime) {
        day = format(new Date(start.dateTime), FORMAT);
        e.startTime = format(new Date(start.dateTime), FORMAT_TIME);
        e.endTime = format(new Date(end.dateTime), FORMAT_TIME);
      }
      if (day in acc) {
        acc[day].push(e);
      } else {
        acc[day] = [e];
      }
      return acc;
    }, {});
  } catch (error) {
    throw new Error(error);
  }
};
