import {render, RenderPosition} from '../framework/render.js';
import ListView from '../view/list.js';
import NoPointView from '../view/no-point.js';
import SortListView from '../view/sort-list.js';
import PointPresenter from './point-presenter.js';
import {SortType} from '../const.js';
import {sortPricePoint, sortDatePoint} from '../utils.js';

const POINT_STEP = 0;

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE_DOWN:
        this.#boardPoints.sort(sortPricePoint);
        break;
      case SortType.DATE_DOWN:
      default:
        this.#boardPoints.sort(sortDatePoint);
    }
  }

  #clearPointsList() {
    this.#pointPresenter.forEach((pointPresenter) => {
      pointPresenter.destroy();
    });
  }

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderPoints();
  };

  #renderSort() {
    this.#sortComponent = new SortListView({
      onSortTypeChange: this.#handleSortTypeChange
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

  #renderPoints() {
    this.#boardPoints
      .forEach((point, index) => this.#renderPoint(point, index));
  }

  #renderNoPoint() {
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardPoints.length === this.#renderedPointCount) {
      this.#renderNoPoint();
    } else {
      this.#renderSort();
      this.#renderPoints();
    }
  }
}
