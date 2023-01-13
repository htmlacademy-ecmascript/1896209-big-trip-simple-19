import {render, replace, RenderPosition} from '../framework/render.js';
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

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToForm.call(this);
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditFormComponent = new EditFormView({
      point,
      onFormSubmit: () => {
        replaceFormToPoint.call(this);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm () {
      replace(pointEditFormComponent, pointComponent);
    }

    function replaceFormToPoint () {
      replace(pointComponent, pointEditFormComponent);
    }

    render(pointComponent, this.#boardComponent.element);
  }
}
