import {render, RenderPosition} from '../render.js';
import EditFormView from '../view/edit-form.js';
import PointView from '../view/point.js';
import ListView from '../view/list.js';
import CreationFormView from '../view/creation-form';
import NoPointView from '../view/no-point.js';
import SortListView from '../view/sort-list.js';

const FOR_TEST = 0;

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #boardComponent = new ListView();

  #boardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardPoints.length === FOR_TEST) {
      render(new NoPointView(), this.#boardComponent.element);
    } else {
      render(new SortListView(), this.#boardComponent.element);
      render(new CreationFormView({point: this.#boardPoints[0]}), this.#boardComponent.element, RenderPosition.BEFOREEND);

      for (let i = 1; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }}
  }

  #renderPoint(point) {
    const pointComponent = new PointView({point});
    const pointEditFormComponent = new EditFormView({point});

    const replacePointToForm = () => {
      this.#boardComponent.element.replaceChild(pointEditFormComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#boardComponent.element.replaceChild(pointComponent.element, pointEditFormComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditFormComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#boardComponent.element);
  }
}
