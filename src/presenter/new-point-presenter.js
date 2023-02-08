import EditFormView from '../view/edit-form.js';
import { render, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../const.js';
import { nanoid } from 'nanoid';
import AbstractView from '../framework/view/abstract-view.js';

export default class NewPointPresenter extends AbstractView {
  #pointListContainer = null;
  #newPointFormComponent = null;
  #renderPositionComponent = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({ pointListContainer, onDestroy, onDataChange, renderPositionComponent, offersModel, destinationsModel }) {
    super();
    this.#pointListContainer = pointListContainer;
    this.#handleDestroy = onDestroy;
    this.#handleDataChange = onDataChange;
    this.#renderPositionComponent = renderPositionComponent;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    if (this.#newPointFormComponent !== null) {
      return;
    }

    this.#newPointFormComponent = new EditFormView({
      onFormSubmit: this.#handlerFormSubmit,
      onDeleteClick: this.#handlerRemove,
      offersByType: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations
    });
    //{point, offersByType, destinations, onFormSubmit, onDeleteClick}
    // eslint-disable-next-line no-console
    console.log(this.#renderPositionComponent.component);
    render(this.#newPointFormComponent, this.#renderPositionComponent.component, this.#renderPositionComponent.position);
  }

  destroy() {
    if (this.#newPointFormComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#newPointFormComponent);
    this.#newPointFormComponent = null;
    document.removeEventListener('keydown', this.#escHandler);
  }

  #handlerFormSubmit = (point) => {
    point.id = nanoid();
    this.#handleDataChange(
      UserAction.CREATE_POINT,
      UpdateType.MAJOR,
      point
    );
    this.destroy();
  };

  #handlerRemove = () => {
    this.destroy();
  };

  #escHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
