import {SortType} from '../const.js';
import dayjs from 'dayjs';


const sort = {
  [SortType.PRICE]: (pointA, pointB) => pointB.price - pointA.price,
  [SortType.DAY]: (pointA, pointB) => dayjs(pointA.start).diff(dayjs(pointB.start)),
};

export {sort};
