import EditFormView from '../view/edit-form.js';
import {render, remove} from '../framework/render.js';
import {UpdateType, UserAction} from '../const.js';

export default class NewPointPresenter {
  #newPointFormComponent = null;
  #position = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({onDestroy, onDataChange, position, offersModel, destinationsModel}) {
    this.#handleDestroy = onDestroy;
    this.#handleDataChange = onDataChange;
    this.#position = position;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    if (this.#newPointFormComponent !== null) {
      return;
    }

    this.#newPointFormComponent = new EditFormView({
      onSubmit: this.#handlerFormSubmit,
      onRemove: this.#handlerRemove,
      offersByType: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations
    });

    render(this.#newPointFormComponent, this.#position.component, this.#position.position);
  }

  setSaving() {
    this.#newPointFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };
    this.#newPointFormComponent.shake(resetFormState);
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

  #handlerFormSubmit = async (point) => {
    const isSuccess = await this.#handleDataChange(
      UserAction.CREATE_POINT,
      UpdateType.MAJOR,
      point
    );
    if (isSuccess) {
      this.destroy();
    }
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
