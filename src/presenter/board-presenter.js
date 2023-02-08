import {render, RenderPosition, remove} from '../framework/render.js';
import BoardView from '../view/board-view.js';
import ListView from '../view/list.js';
import NoPointView from '../view/no-point.js';
import SortListView from '../view/sort-list.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {FilterType, SortType, UpdateType, UserAction} from '../const.js';
import {sortPricePoint, sortDatePoint} from '../utils/utils.js';
import {filter} from '../utils/filter.js';
import OffersModel from '../model/offers-model.js';
import DestinationsModel from '../model/destination-model.js';


const POINT_STEP = 10;

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationModel = null;

  #filterModel = null;
  #filterType = FilterType.EVERYTHING;

  #boardComponent = new BoardView();
  #pointListComponent = new ListView();
  #sortComponent = null;
  #noPointComponent = null;
  #currentSortType = SortType.DEFAULT;

  #renderedPointCount = POINT_STEP;
  #pointPresenter = new Map();
  #newPointPresenter = null;

  renderedPoints = [];

  constructor({boardContainer, pointsModel, filterModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = new OffersModel;
    this.#destinationModel = new DestinationsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#boardComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationModel
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.CREATE_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.REMOVE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedPointCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE_DOWN:
        return filteredPoints.sort(sortPricePoint);
      case SortType.DATE_DOWN:
        return filteredPoints.sort(sortDatePoint);
    }

    return filteredPoints;
  }

  createPoint() {
    this.#currentSortType = SortType.DATE_DOWN;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  init() {
    this.#renderBoard();
  }

  #setDefaultPointsView = () => {
    this.#newPointPresenter.destroy();
    this.renderedPoints.forEach((pointPres) => { pointPres.resetView();});
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedPointCount: true});
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortListView({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, index) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#boardComponent.element,
      setDefaultView: this.#setDefaultPointsView,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#setDefaultPointsView
    });
    pointPresenter.init(point);
    this.renderedPoints.push(pointPresenter);
    this.#pointPresenter.set(index, pointPresenter);
  }

  #renderPoints(points) {
    // this.#boardPoints
    //   .forEach((point, index) => this.#renderPoint(point, index));
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoint() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointCount = this.points.length;

    this.#newPointPresenter.destroy();

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetRenderedPointCount) {
      this.#renderedPointCount = POINT_STEP;
    } else {
      this.#renderedPointCount = Math.min(pointCount, this.#renderedPointCount);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DATE_DOWN;
    }
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoint();
      return;
    }

    this.#renderSort();
    render(this.#pointListComponent, this.#boardComponent.element);
    this.#renderPoints(points.slice(0, Math.min(pointCount, this.#renderedPointCount)));
  }
}
