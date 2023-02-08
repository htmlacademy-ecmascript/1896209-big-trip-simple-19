import dayjs from 'dayjs';

function isTaskRepeating(repeating) {
  return Object.values(repeating).some(Boolean);
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export {isDatesEqual, isTaskRepeating};
