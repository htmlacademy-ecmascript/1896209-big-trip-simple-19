import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonView from './view/new-point-button.js';
import {render} from './framework/render.js';
import {FilterType, UpdateType, END_POINT} from './const.js';
import randomString from 'randomString';
import PointService from './point-service.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';

const token = `Basic ${randomString.generate()}`;
const pointService = new PointService(END_POINT, token);
const offersModel = new OffersModel({ apiService: pointService });
const destinationsModel = new DestinationsModel({ apiService: pointService });
const pointsModel = new PointsModel({ offersModel, destinationsModel, apiService: pointService });
pointsModel.init();

const filterModel = new FilterModel();

const pointsContainer = document.querySelector('.trip-events');
const pointsPresenter = new BoardPresenter({
  pointsContainer: pointsContainer,
  filterModel: filterModel,
  onNewPointFormClose: handleNewPointFormClose,
  disableButton: disableButton,
  pointsModel: pointsModel,
  offersModel: offersModel,
  destinationsModel: destinationsModel
});
pointsPresenter.init();

const newPointComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});
function handleNewPointFormClose() {
  newPointComponent.element.disabled = false;
}
function handleNewPointButtonClick() {
  pointsPresenter.openNewPointForm();
  newPointComponent.element.disabled = true;
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
}

function disableButton() {
  newPointComponent.element.disabled = true;
}


const newPointContainer = document.querySelector('.trip-main');
render(newPointComponent, newPointContainer);

const filterContainer = document.querySelector('.trip-controls__filters');
const filterPresenter = new FilterPresenter({
  filterContainer: filterContainer,
  filterModel: filterModel,
  pointsModel: pointsModel
});
filterPresenter.init();

