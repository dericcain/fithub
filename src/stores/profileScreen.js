import { store } from 'react-easy-state';

export const ProfileScreen = store({
  editInfo: false,
  editHours: false,
  dayPickerVisible: false,
  selectedDay: '',
  setEditInfo() {
    ProfileScreen.editInfo = !ProfileScreen.editInfo;
  },
  setEditHours() {
    ProfileScreen.editHours = !ProfileScreen.editHours;
  },
  setDay(day) {
    ProfileScreen.selectedDay = day.toLowerCase();
  },
  setDayPickerVisible() {
    ProfileScreen.dayPickerVisible = !ProfileScreen.dayPickerVisible;
  },
});
