import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'hh:mm';
const DATE_TIME_FORMAT = 'DD/MM/YY hh:mm';

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

function humanizePointTimeFrom(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(TIME_FORMAT) : '';
}

function humanizePointTimeTo(dateTo) {
  return dateTo ? dayjs(dateTo).format(TIME_FORMAT) : '';
}

function humanizePointDateTimeFrom(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(DATE_TIME_FORMAT) : '';
}

function humanizePointDateTimeTo(dateTo) {
  return dateTo ? dayjs(dateTo).format(DATE_TIME_FORMAT) : '';
}

function sortDatePoint(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPricePoint(pointA, pointB) {
  return pointB.price - pointA.price;
}

export {getRandomArrayElement, humanizePointDate, humanizePointTimeFrom, humanizePointTimeTo, getRandomPositiveInteger, humanizePointDateTimeFrom, humanizePointDateTimeTo, sortPricePoint, sortDatePoint};
