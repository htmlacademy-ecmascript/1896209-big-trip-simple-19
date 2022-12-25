import {getRandomArrayElement, getRandomPositiveInteger} from '../utils.js';
import {TYPE} from '../const.js';

const destinations = [
  {
    id: 0,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,10)}`,
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Geneva',
    pictures: [
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
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(1,10)}`,
        description: 'Aliquam erat volutpat.'
      }
    ]
  }
];

const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        id: 0,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 140
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 160
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 0,
        title: 'Upgrade to a business class',
        price: 220
      },
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 240
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 260
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 0,
        title: 'Upgrade to a business class',
        price: 130
      },
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 150
      },
      {
        id: 2,
        title: 'Upgrade to a business class',
        price: 170
      }
    ]
  }
];

const mockPoints = [
  {
    basePrice: 1100,
    dateFrom: '2019-07-10T06:30:00.000Z',
    dateTo: '2019-07-15T11:22:13.375Z',
    id: '0',
    type: getRandomArrayElement(TYPE),
    offers: [0, 1, 2],
    destination: '0'
  },
  {
    basePrice: 2100,
    dateFrom: '2019-07-15T18:22:44.485Z',
    dateTo: '2019-07-20T12:26:13.575Z',
    id: '1',
    type: getRandomArrayElement(TYPE),
    offers: [0, 1, 2],
    destination: '1'
  },
  {
    basePrice: 3100,
    dateFrom: '2019-07-20T10:30',
    dateTo: '2019-07-25T12:30',
    id: '2',
    type: getRandomArrayElement(TYPE),
    offers: [0, 1, 2],
    destination: '2'
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint, offersByType, destinations};