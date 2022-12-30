import {render, RenderPosition} from '../render.js';
import EditFormView from '../view/edit-form.js';
import PointView from '../view/point.js';
import ListView from '../view/list.js';
import CreationFormView from '../view/creation-form';

export default class BoardPresenter {
  boardComponent = new ListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.boardComponent, this.boardContainer);
    render(new EditFormView({point: this.boardPoints[0]}), this.boardComponent.getElement(), RenderPosition.BEFOREEND);
    render(new CreationFormView({point: this.boardPoints[0]}), this.boardComponent.getElement(), RenderPosition.BEFOREEND);

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i]}), this.boardComponent.getElement());
    }
  }
}
