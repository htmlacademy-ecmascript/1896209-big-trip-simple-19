import FilterListView from './view/filter-list.js';
import SortListView from './view/sort-list.js';
// import CreationFormView from './view/creation-form.js';
import PointsModel from './model/point-model.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  pointsModel
});

render(new FilterListView(), siteHeaderElement);
render(new SortListView(), siteMainElement);

boardPresenter.init();

