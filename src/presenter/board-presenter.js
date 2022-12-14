import {render, RenderPosition} from '../render.js';
import EditFormView from '../view/edit-form.js';
import PointView from '../view/point.js';
import ListView from '../view/list.js';

export default class BoardPresenter {
  boardComponent = new ListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new EditFormView(), this.boardComponent.getElement(), RenderPosition.BEFOREEND);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.boardComponent.getElement());
    }
  }
}
