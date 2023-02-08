import {render} from './framework/render.js';
// import FilterListView from './view/filter-list.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/point-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const siteElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  pointsModel,
  filterModel,
  onNewTaskDestroy: handleNewTaskFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filterModel,
  pointsModel
});

const newTaskButtonComponent = new NewPointButtonView({
  onClick: handleNewTaskButtonClick
});

function handleNewTaskFormClose() {
  newTaskButtonComponent.element.disabled = false;
}

function handleNewTaskButtonClick() {
  boardPresenter.createPoint();
  newTaskButtonComponent.element.disabled = true;
}

render(newTaskButtonComponent, siteElement);

filterPresenter.init();
boardPresenter.init();

