import {render, RenderPosition} from '../framework/render.js';
import ListView from '../view/list.js';
// import CreationFormView from '../view/creation-form';
import NoPointView from '../view/no-point.js';
import SortListView from '../view/sort-list.js';
import PointPresenter from './point-presenter.js';

const POINT_STEP = 0;

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new ListView();
  #sortComponent = new SortListView();
  #noPointComponent = new NoPointView();

  #boardPoints = [];
  #renderedPointCount = POINT_STEP;
  #pointPresenter = new Map();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#boardComponent.element,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#handleModeChange();
  }

  #renderPoints(from, to) {
    this.#boardPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point));
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
