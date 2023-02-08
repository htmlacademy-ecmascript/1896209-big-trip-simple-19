import {render, replace, remove} from '../framework/render.js';
import PointView from '../view/point.js';
import EditFormView from '../view/edit-form.js';
import {UpdateType, UserAction} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #setDefaultView = null;
  #handleDataChange = null;

  #pointComponent = null;
  #pointFormComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  #offersModel = null;
  #destinationsModel = null;


  constructor({pointListContainer, setDefaultView, onDataChange, offersModel, destinationsModel}) {
    this.#pointListContainer = pointListContainer;
    this.#setDefaultView = setDefaultView;
    this.#handleDataChange = onDataChange;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditFormComponent = this.#pointFormComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onRollUp: this.#handlerRollUp
    });
    this.#pointFormComponent = new EditFormView({
      point: this.#point,
      onFormSubmit: this.#handlerFormSubmit,
      offersByType: this.#offersModel.offers,
      destinations: this.#destinationsModel.destinations,
      onDeleteClick: this.#handlerRemove,
      onRollDown: this.#handlerRollDown
    });

    if (prevPointComponent === null || prevEditFormComponent === null) {
      render(this.#pointComponent, this.#pointListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#pointFormComponent, prevEditFormComponent);
    }
    remove(prevPointComponent);
    remove(prevEditFormComponent);
  }

  #replacePointToForm() {
    replace(this.#pointFormComponent, this.#pointComponent);
    this.#setDefaultView();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointFormComponent);
    this.#mode = Mode.DEFAULT;
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#pointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };
    this.#pointFormComponent.shake(resetFormState);
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointFormComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  #handlerFormSubmit = async (point) => {
    let updateType = UpdateType.PATCH;
    if (this.#point.price !== point.price || this.#point.start !== point.start || this.#point.end !== point.end) {
      updateType = UpdateType.MINOR;
    }
    const isSuccess = await this.#handleDataChange(
      UserAction.UPDATE_POINT,
      updateType,
      point
    );
    if (isSuccess) {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escHandler);
    }
  };

  #handlerRemove = (point) => {
    this.#handleDataChange(
      UserAction.REMOVE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handlerRollDown = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escHandler);
  };

  #handlerRollUp = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escHandler);
  };

  #escHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escHandler);
    }
  };

}
