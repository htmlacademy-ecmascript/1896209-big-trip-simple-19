import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';
const DATE_TIME_FORMAT = 'hh:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function humanizePointDate(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
}

function humanizePointDateFrom(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(DATE_TIME_FORMAT) : '';
}

function humanizePointDateTo(dateTo) {
  return dateTo ? dayjs(dateTo).format(DATE_TIME_FORMAT) : '';
}

export {getRandomArrayElement, humanizePointDate, humanizePointDateFrom, humanizePointDateTo, getRandomPositiveInteger};
