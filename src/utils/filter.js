import {FilterType} from '../const.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => {
    const now = new Date();
    return points.filter((point) => point.end >= now);
  }
};

export {filter};
