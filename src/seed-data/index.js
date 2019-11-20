export const userSeed = {
  bio: 'I want to pump... you up!',
  isAvailable: true,
  isTrainer: true,
  postalCode: '35071',
  availability: {
    sunday: {
      start: '',
      end: '',
    },
    monday: {
      start: '7:00',
      end: '15:00',
    },
    tuesday: {
      start: '9:00',
      end: '17:00',
    },
    wednesday: {
      start: '9:00',
      end: '17:00',
    },
    thursday: {
      start: '11:00',
      end: '18:00',
    },
    friday: {
      start: '9:00',
      end: '17:00',
    },
    saturday: {
      start: '',
      end: '',
    },
  },
};

export const sessionSeed = {
  duration: 60,
  price: 75.0,
  name: 'The Hercules',
  description: 'This will make you all of your wildest dreams come true.',
};
