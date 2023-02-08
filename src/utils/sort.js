import {SortType} from '../const.js';
import dayjs from 'dayjs';


const sort = {
  [SortType.PRICE]: (pointA, pointB) => pointB.basePrice - pointA.basePrice,
  [SortType.DAY]: (pointA, pointB) => dayjs(pointA.start).diff(dayjs(pointB.start)),
};

export {sort};
