import FilterListView from './view/filter-list.js';
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

boardPresenter.init();

