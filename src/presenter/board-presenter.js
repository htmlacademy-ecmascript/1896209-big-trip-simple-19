import {render, RenderPosition, remove} from '../framework/render.js';
import ListView from '../view/list.js';
import NoPointView from '../view/no-point.js';
import SortListView from '../view/sort-list.js';
import PointPresenter from './point-presenter.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {sortPricePoint, sortDatePoint} from '../utils/utils.js';

const POINT_STEP = 0;

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #pointListComponent = null;

  #boardComponent = new ListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();
  #currentSortType = SortType.DEFAULT;

  #sourcedPoints = [];

  #boardPoints = [];
  #renderedPointCount = POINT_STEP;
  #pointPresenter = new Map();

  renderedPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
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
    // eslint-disable-next-line no-console
    console.log(updateType, data);
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
    switch (this.#currentSortType) {
      case SortType.PRICE_DOWN:
        return [...this.#pointsModel.points].sort(sortPricePoint);
      case SortType.DATE_DOWN:
        return [...this.#pointsModel.points].sort(sortDatePoint);
    }

    return this.#pointsModel.points;
  }

  init() {
    const points = this.#pointsModel.points;
    this.#boardPoints = [...points];
    this.#sourcedPoints = [...points];

    this.#renderBoard();
  }

  #setDefaultPointsView = () => {
    this.renderedPoints.forEach((pointPres) => { pointPres.resetView();});
  };

  // #sortPoints(sortType) {
  //   switch (sortType) {
  //     case SortType.PRICE_DOWN:
  //       this.#boardPoints.sort(sortPricePoint);
  //       break;
  //     case SortType.DATE_DOWN:
  //     default:
  //       this.#boardPoints.sort(sortDatePoint);
  //   }
  // }

  // #clearPointsList() {
  //   this.#pointPresenter.forEach((pointPresenter) => {
  //     pointPresenter.destroy();
  //   });
  // }

  #handleSortTypeChange = (sortType) => {
    // this.#sortPoints(sortType);
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedPointCount: true});
    this.#renderBoard();
    // this.#clearPointsList();
    // this.#renderPoints();
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
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointCount = this.points.length;

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

    // if (taskCount > this.#renderedPointCount) {
    //   this.#renderLoadMoreButton();
    // }

    // if (this.#boardPoints.length === this.#renderedPointCount) {
    //   this.#renderNoPoint();
    // } else {
    //   this.#renderSort();
    //   this.#renderPoints();
    // }
  }
}
