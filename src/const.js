const TYPE = ['bus', 'taxi', 'drive'];

const SortType = {
  DATE_DOWN: 'date-down',
  PRICE_DOWN: 'price-down',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  CREATE_POINT: 'CREATE_POINT',
  REMOVE_POINT: 'REMOVE_POINT',
};

export {TYPE, SortType, FilterType, UpdateType, UserAction};
