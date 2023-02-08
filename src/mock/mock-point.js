import {getRandomPositiveInteger} from '../utils/utils.js';

const destinations = [
  {
    id: 0,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures:[
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,10)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,10)}`,
        description: 'Aliquam erat volutpat.'
      }
    ]
  },
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Geneva',
    pictures:[
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,10)}`,
        description: 'In rutrum ac purus sit amet tempus.'
      }
    ]
  },
  {
    id: 2,
    description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    name: 'Amsterdam',
    pictures:[
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,10)}`,
        description: 'Aliquam erat volutpat.'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,10)}`,
        description: 'In rutrum ac purus sit amet tempus.'
      }
    ]
  }
];

export const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        id: 0,
        title: 'Add luggage',
        price: 30
      },
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 140
      },
      {
        id: 2,
        title: 'Add meal',
        price: 15
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 0,
        title: 'Travel by train',
        price: 45
      },
      {
        id: 1,
        title: 'Choose seats',
        price: 5
      },
      {
        id: 2,
        title: 'Switch to comfort class',
        price: 200
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 0,
        title: 'Upgrade to a business class',
        price: 130
      },
      {
        id: 1,
        title: 'Add luggage',
        price: 20
      },
      {
        id: 2,
        title: 'Choose seats',
        price: 5
      }
    ]
  }
];

const mockPoints = [
  {
    basePrice: 1100,
    dateFrom: '2019-03-18T12:30',
    dateTo: '2019-03-18T15:30',
    id: '0',
    type: 'taxi',
    offers: [0, 1],
    destinations: 0,
  },
  {
    basePrice: 2100,
    dateFrom: '2019-04-18T10:30',
    dateTo: '2019-04-20T11:30',
    id: '1',
    type: 'bus',
    offers: [0],
    destinations: 1,
  },
  {
    basePrice: 3100,
    dateFrom: '2019-03-19T11:30',
    dateTo: '2019-04-21T17:25',
    id: '2',
    type: 'drive',
    offers: [1],
    destinations: 2,
  }
];

export {mockPoints, destinations};
