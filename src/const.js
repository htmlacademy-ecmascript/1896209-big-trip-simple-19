const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

const SortType = {
  PRICE: 'basePrice',
  DAY: 'day'
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  CREATE_POINT: 'CREATE_POINT',
  REMOVE_POINT: 'REMOVE_POINT',
};

const MessagesType = {
  ...FilterType,
  ERROR: 'ERROR'
};

export {SortType, UpdateType, UserAction, FilterType, MessagesType, END_POINT};
