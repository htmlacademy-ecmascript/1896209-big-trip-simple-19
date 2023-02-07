import {render} from './framework/render.js';
import FilterListView from './view/filter-list.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/point-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

const filters = [
  {
    type: 'all',
    name: 'ALL',
    count: 0,
  },
];

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  pointsModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel: filterModel
});

// render(new FilterListView(), siteHeaderElement);
render(new FilterListView({
  filters,
  currentFilterType: 'all',
  onFilterTypeChange: () => {}
}), siteHeaderElement);

filterPresenter.init();
boardPresenter.init();

