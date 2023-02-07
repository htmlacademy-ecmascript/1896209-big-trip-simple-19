import AbstractView from '../framework/view/abstract-view.js';

function createFilterListTemplate (filter, currentFilterType) {
  const {type, name, count} = filter;
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterListView extends AbstractView{

  get template() {
    return createFilterListTemplate();
  }
}
