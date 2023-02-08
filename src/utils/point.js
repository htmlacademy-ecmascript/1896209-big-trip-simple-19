import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const MACHINE_FORMAT = 'YYYY-MM-DDTHH:mm';
const MACHINE_DATA_FORMAT = 'YYYY-MM-DD';

function humanizePointTime(datetime) {
  return dayjs(datetime).format(TIME_FORMAT);
}

function machinePointDateTime(dateTime) {
  return dayjs(dateTime).format(MACHINE_FORMAT);
}

function humanizePointDate(date) {
  return dayjs(date).format(DATE_FORMAT);
}

function machinePointDate(date) {
  return dayjs(date).format(MACHINE_DATA_FORMAT);
}

export {humanizePointTime, machinePointDateTime, humanizePointDate, machinePointDate};
