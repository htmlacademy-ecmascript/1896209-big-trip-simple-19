import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

function createFilterTemplate (filterType, isDisabledFuture) {
  const checked = (filter) => filterType === filter ? 'checked' : '';

  return `<div class="trip-main__trip-controls  trip-controls">
  <div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" ${checked(FilterType.EVERYTHING)}>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}" ${checked(FilterType.FUTURE)} ${isDisabledFuture ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>
</div>`;
}

export default class FilterListView extends AbstractView {
  #handleFilterTypeChange = null;
  #filterType = null;
  #isDisabledFuture = null;

  constructor({onChange, filterType, isDisabledFuture}) {
    super();
    this.#handleFilterTypeChange = onChange;
    this.#filterType = filterType;
    this.#isDisabledFuture = isDisabledFuture;

    const filters = this.element.querySelectorAll('.trip-filters__filter-input');
    filters.forEach((filter) => {
      filter.addEventListener('change', this.#filterTypeChangeHandler);
    });
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

  get template() {
    return createFilterTemplate(this.#filterType, this.#isDisabledFuture);
  }
}
