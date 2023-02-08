import FilterListView from '../view/filter-list.js';
import {render, replace, remove} from '../framework/render.js';
import {FilterType, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filterComponent = null;
  #pointsModel = null;

  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](points).length,
      },
    ];
  }

  //init(filterType = FilterType.EVERYTHING) {
  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterListView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }
    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  // #handleModelEvent = (_updateType, filterType) => {
  //   this.init(filterType);
  // };

  #handleModelEvent = () => {
    this.init();
  };

}
